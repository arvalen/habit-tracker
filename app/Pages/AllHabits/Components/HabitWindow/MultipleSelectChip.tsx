import * as React from "react";
import { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { textToIcon } from "../IconsWindow/IconData";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(
  name: string,
  selectedNames: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  onChange,
}: {
  onChange: (selectedAreasItems: AreaType[] | null) => void;
}) {
  const theme = useTheme();

  const {
    allAreasObject,
    darkModeObject,
    habitWindowObject,
    selectedItemsObject,
  } = useGlobalContextProvider();
  const { openHabitWindow } = habitWindowObject;
  const { allAreas } = allAreasObject;
  const { isDarkMode } = darkModeObject;
  const { selectedItems } = selectedItemsObject;

  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);

  const [selectedAreasItems, setSelectedAreasItems] = useState<AreaType[] | null>([]);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
    const {
      target: { value },
    } = event;
    setSelectedAreas(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const filteredAreas = allAreas.filter((area) => area.name !== "All");

  React.useEffect(() => {
    const selectedAreaObjects = selectedAreas.map((selectedArea) => {
      return allAreas.find((area) => area.name === selectedArea);
    }).filter((area): area is AreaType => area !== undefined); // Filter out undefined and assert type

    setSelectedAreasItems(selectedAreaObjects.length > 0 ? selectedAreaObjects : null);
  }, [selectedAreas, allAreas]);

  React.useEffect(() => {
    onChange(selectedAreasItems);
  }, [selectedAreasItems, onChange]);

  React.useEffect(() => {
    if (selectedItems) {
      const habitSelected = selectedItems as HabitType;
      const { areas } = habitSelected;

      const selectedArea = areas.map((area) => {
        return area.name;
      });

      setSelectedAreas(selectedArea);
    } else {
      setSelectedAreas([]);
    }
  }, [openHabitWindow, selectedItems]);

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          "& .Mui-focused .MuiInputLabel-root": {
            color: defaultColor.default,
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: defaultColor.default,
          },
        }}
      >
        <InputLabel
          sx={{
            "&.Mui-focused": {
              color: defaultColor.default,
            },
            ...(isDarkMode && { color: "white" }),
          }}
          id="demo-multiple-chip-label"
        >
          Choose Your Area...
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedAreas}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Choose your area..."
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: defaultColor.default,
                },
                ...(isDarkMode && {
                  borderColor: "white",
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }),
              }}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: isDarkMode
                      ? darkModeColor.textColor
                      : defaultColor[100],
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filteredAreas.map((area) => (
            <MenuItem
              key={area._id}
              value={area.name}
              style={getStyles(area.name, selectedAreas, theme)}
              sx={{
                color: isDarkMode
                  ? darkModeColor.textColor
                  : defaultColor.textColor,
              }}
            >
              <FontAwesomeIcon
                className="text-red-500"
                icon={area.icon}
                style={{ marginRight: 8 }}
              />
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
