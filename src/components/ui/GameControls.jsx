import React from "react";
import Dropdown from "./Dropdown";
import Loader from "./Loader";
import { DIFFICULTY_OPTIONS, AGE_GROUP_OPTIONS } from "../../utils/constants";

const GameControls = ({
  difficulty,
  ageGroup,
  onDifficultyChange,
  onAgeGroupChange,
  loading,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Game Settings
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown
          label="Difficulty Level"
          options={DIFFICULTY_OPTIONS}
          value={difficulty}
          onChange={onDifficultyChange}
          loading={loading}
          placeholder="Select difficulty"
        />

        <Dropdown
          label="Age Group"
          options={AGE_GROUP_OPTIONS}
          value={ageGroup}
          onChange={onAgeGroupChange}
          loading={loading}
          placeholder="Select age group"
        />
      </div>

      {loading && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600">
          <Loader size="medium" />
          <span className="text-sm">Loading new questions...</span>
        </div>
      )}
    </div>
  );
};

export default GameControls;
