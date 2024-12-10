"use client";

import { CoordinatesConfig, UIConfig } from "@/chess/Types";
import ChessMainUI from "@/chess/ui/ChessMainUI";
import ProjectHeaderBar from "@/components/ProjectHeaderBar";
import SettingsCheckbox from "@/components/settings/checkbox";
import SettingsDropdown from "@/components/settings/dropdown";
import SettingsMenu from "@/components/settings/settings";
import { useState } from "react";

export default function Page() {
  const [config, setConfig] = useState<UIConfig>({
    coordinates: "axis",
    sidebar: false,
  });
  console.log(config);
  return (
    <div className="h-screen w-screen flex flex-col">
      <ProjectHeaderBar title="Chess">
        <SettingsMenu>
          <SettingsDropdown
            label="Show coordinates"
            options={[
              ["All squares", "all"],
              ["None", "none"],
              ["Axis only", "axis"],
            ]}
            onChange={(e) => {
              setConfig({
                ...config,
                coordinates: e.target.value as CoordinatesConfig,
              });
            }}
            defaultValue={config.coordinates}
          />
          <SettingsCheckbox
            label="Show sidebar"
            checked={config.sidebar}
            onChange={() => {
              setConfig({ ...config, sidebar: !config.sidebar });
            }}
          />
        </SettingsMenu>
      </ProjectHeaderBar>
      <ChessMainUI config={config} />
    </div>
  );
}
