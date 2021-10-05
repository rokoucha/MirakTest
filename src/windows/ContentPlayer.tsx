import { remote } from "electron"
import React, { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  contentPlayerBoundsAtom,
  contentPlayerTitleAtom,
} from "../atoms/contentPlayer"
import { globalActiveContentPlayerIdAtom } from "../atoms/global"
import { PluginPositionComponents } from "../components/common/PluginPositionComponents"
import { CoiledController } from "../components/contentPlayer/Controller"
import { MirakurunManager } from "../components/contentPlayer/MirakurunManager"
import { CoiledProgramTitleManager } from "../components/contentPlayer/ProgramTitleManager"
import { CoiledSubtitleRenderer } from "../components/contentPlayer/SubtitleRenderer"
import { CoiledVideoPlayer } from "../components/contentPlayer/VideoPlayer"
import { Splash } from "../components/global/Splash"
import { useContentPlayerContextMenu } from "../utils/contextmenu"

export const CoiledContentPlayer: React.VFC<{}> = () => {
  const setBounds = useSetRecoilState(contentPlayerBoundsAtom)
  const onContextMenu = useContentPlayerContextMenu()
  const setActiveContentPlayerId = useSetRecoilState(
    globalActiveContentPlayerIdAtom
  )

  useEffect(() => {
    const remoteWindow = remote.getCurrentWindow()
    // 16:9以下の比率になったら戻し、ウィンドウサイズを保存する
    const onResizedOrMoved = () => {
      const bounds = remoteWindow.getContentBounds()
      const min = Math.ceil((bounds.width / 16) * 9)
      if (process.platform === "win32" && bounds.height < min) {
        const targetBounds = {
          ...bounds,
          height: min,
        }
        remoteWindow.setContentBounds(targetBounds)
        setBounds(targetBounds)
      } else {
        setBounds(bounds)
      }
    }
    remoteWindow.on("resized", onResizedOrMoved)
    remoteWindow.on("moved", onResizedOrMoved)
    onResizedOrMoved()
    // コンテキストメニュー
    remoteWindow.webContents.on("context-menu", onContextMenu)
    const onFocus = () => {
      setActiveContentPlayerId(remoteWindow.id)
    }
    onFocus()
    remoteWindow.on("focus", onFocus)
    return () => {
      remoteWindow.off("resized", onResizedOrMoved)
      remoteWindow.off("moved", onResizedOrMoved)
      remoteWindow.off("focus", onFocus)
    }
  }, [])
  // タイトル
  const title = useRecoilValue(contentPlayerTitleAtom)
  useEffect(() => {
    const window = remote.getCurrentWindow()
    if (title) {
      window.setTitle(`${title} - ${remote.app.name}`)
    } else {
      window.setTitle(remote.app.name)
    }
  }, [title])

  return (
    <>
      <MirakurunManager />
      <CoiledProgramTitleManager />
      <div className="w-full h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="relative w-full h-full overflow-hidden">
          <div id="Splash" className="absolute top-0 left-0 w-full h-full">
            <Splash />
          </div>
          <div
            id="OnSplashComponents"
            className="absolute top-0 left-0 w-full h-full"
          >
            <PluginPositionComponents position="onSplash" />
          </div>
          <div
            id="VideoPlayer"
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          >
            <CoiledVideoPlayer />
          </div>
          <div
            id="OnPlayerComponents"
            className="absolute top-0 left-0 w-full h-full"
          >
            <PluginPositionComponents position="onPlayer" />
          </div>
          <div
            id="SubtitleRenderer"
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          >
            <CoiledSubtitleRenderer />
          </div>
          <div
            id="OnSubtitleComponents"
            className="absolute top-0 left-0 w-full h-full"
          >
            <PluginPositionComponents position="onSubtitle" />
          </div>
          <div id="Controller" className="absolute top-0 left-0 w-full h-full">
            <CoiledController />
          </div>
          <div
            id="OnForwardComponents"
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          >
            <PluginPositionComponents position="onForward" />
          </div>
        </div>
      </div>
    </>
  )
}
