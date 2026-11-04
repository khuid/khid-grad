// [2024 전용 도구] 영상 파일을 웹용으로 다시 압축 — macOS 기본 AVFoundation만 씀 (ffmpeg 없이)
// H.264 High, 크기 그대로(1080p면 1080p), 영상 비트레이트를 직접 정함 + AAC 소리, 처음부터 바로 재생되게(fast start)
// Behind 브랜딩 영상: 원본 193MB(27Mbps) → 6.5Mbps로 다시 압축해 45MB (2026-11-05). GitHub 권장 50MB 아래, 화질은 원본과 거의 같음(5Mbps 35MB보다 선명)
//
// 실행 (저장소의 2024 폴더에서):
//   swift scripts/encode-video.swift <원본.mp4> <결과.mp4> [영상 Mbps, 기본 5]
import AVFoundation

let args = CommandLine.arguments
guard args.count >= 3 else { print("사용법: swift scripts/encode-video.swift 원본.mp4 결과.mp4 [Mbps]"); exit(1) }
let src = URL(fileURLWithPath: args[1]), dst = URL(fileURLWithPath: args[2])
let mbps = args.count > 3 ? Double(args[3])! : 5
try? FileManager.default.removeItem(at: dst)

let asset = AVURLAsset(url: src)
let sem = DispatchSemaphore(value: 0)
Task {
  do {
    let vTrack = try await asset.loadTracks(withMediaType: .video).first!
    let aTrack = try await asset.loadTracks(withMediaType: .audio).first
    let size = try await vTrack.load(.naturalSize)
    let fps = try await vTrack.load(.nominalFrameRate)
    let transform = try await vTrack.load(.preferredTransform)

    let reader = try AVAssetReader(asset: asset)
    let writer = try AVAssetWriter(outputURL: dst, fileType: .mp4)
    writer.shouldOptimizeForNetworkUse = true

    let vOut = AVAssetReaderTrackOutput(track: vTrack, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange])
    reader.add(vOut)
    let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
      AVVideoCodecKey: AVVideoCodecType.h264,
      AVVideoWidthKey: size.width, AVVideoHeightKey: size.height,
      AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: mbps * 1_000_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: Int((fps > 0 ? fps : 30) * 2),
        AVVideoAllowFrameReorderingKey: true,
      ],
    ])
    vIn.transform = transform
    vIn.expectsMediaDataInRealTime = false
    writer.add(vIn)

    var aOut: AVAssetReaderTrackOutput?, aIn: AVAssetWriterInput?
    if let aTrack {
      let o = AVAssetReaderTrackOutput(track: aTrack, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
      reader.add(o)
      let i = AVAssetWriterInput(mediaType: .audio, outputSettings: [
        AVFormatIDKey: kAudioFormatMPEG4AAC, AVNumberOfChannelsKey: 2, AVSampleRateKey: 48000, AVEncoderBitRateKey: 160_000,
      ])
      i.expectsMediaDataInRealTime = false
      writer.add(i)
      aOut = o; aIn = i
    }

    reader.startReading()
    writer.startWriting()
    writer.startSession(atSourceTime: .zero)

    let group = DispatchGroup()
    func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderTrackOutput, _ q: String) {
      group.enter()
      input.requestMediaDataWhenReady(on: DispatchQueue(label: q)) {
        while input.isReadyForMoreMediaData {
          if let buf = output.copyNextSampleBuffer() { input.append(buf) } else { input.markAsFinished(); group.leave(); return }
        }
      }
    }
    pump(vIn, vOut, "v")
    if let aIn, let aOut { pump(aIn, aOut, "a") }
    group.wait()
    await writer.finishWriting()
    if writer.status != .completed { print("실패:", writer.error ?? "?"); exit(1) }
    let bytes = (try FileManager.default.attributesOfItem(atPath: dst.path)[.size] as! NSNumber).doubleValue
    print(String(format: "완료 %.0fx%.0f %.0ffps %.1fMbps → %.1fMB", size.width, size.height, fps, mbps, bytes / 1_000_000))
  } catch { print("실패:", error); exit(1) }
  sem.signal()
}
sem.wait()
