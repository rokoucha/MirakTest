import React, { useState } from "react"
import { useRecoilState } from "recoil"
import {
  controllerSetting,
  experimentalSetting,
  screenshotSetting,
  subtitleSetting,
} from "../../../atoms/settings"
import { ControllerSettingForm } from "./Controller"
import { ExperimentalSettingForm } from "./Experimental"
import { ScreenshotSettingForm } from "./Screenshot"
import { SubtitleSettingForm } from "./Subtitle"

export const CoiledGeneralSetting: React.VFC<{}> = () => {
  const [coiledControllerSetting, setCoiledControllerSetting] =
    useRecoilState(controllerSetting)
  const [controller, setController] = useState(coiledControllerSetting)
  const [coiledSubtitle, setCoiledSubtitle] = useRecoilState(subtitleSetting)
  const [subtitle, setSubtitle] = useState(coiledSubtitle)
  const [coiledScreenshotSetting, setCoiledScreenshotSetting] =
    useRecoilState(screenshotSetting)
  const [screenshot, setScreenshot] = useState(coiledScreenshotSetting)
  const [coiledExperimentalSetting, setCoiledExperimentalSetting] =
    useRecoilState(experimentalSetting)
  const [experimental, setExperimental] = useState(coiledExperimentalSetting)
  return (
    <form
      className="m-4"
      onSubmit={(e) => {
        e.preventDefault()
        setCoiledControllerSetting(controller)
        setCoiledSubtitle(subtitle)
        setCoiledScreenshotSetting(screenshot)
        setCoiledExperimentalSetting(experimental)
      }}
    >
      <div className="flex flex-col space-y-8">
        <ControllerSettingForm
          controllerSetting={controller}
          setControllerSetting={setController}
        />
        <SubtitleSettingForm
          subtitleSetting={subtitle}
          setSubtitleSetting={setSubtitle}
        />
        <ScreenshotSettingForm
          screenshotSetting={screenshot}
          setScreenshotSetting={setScreenshot}
        />
        <ExperimentalSettingForm
          experimentalSetting={experimental}
          setExperimentalSetting={setExperimental}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-100 text-gray-800 p-2 px-2 my-4 rounded-md focus:outline-none cursor-pointer"
      >
        保存
      </button>
    </form>
  )
}
