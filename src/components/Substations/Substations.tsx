import {
  Box,
  Flex,
  Radio,
  Select,
  TextInput,
  Textarea,
  Tooltip,
  SegmentedControl,
} from "@mantine/core";
import React, { useState } from "react";
import { TPType, substations_real } from "../../db/db";

const Substations = ({
  substation,
  setSubstation,
  numberOfTP,
  setNumberOfTP,
  setCommentValue,
  commentValue,
}: any): JSX.Element => {
  const [searchValue, onSearchChange] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <>
      
        <Select
          w={"100%"}
          label="Select substation"
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          placeholder="Pick one"
          searchable
          nothingFound="No options"
          data={substations_real}
          transitionProps={{
            transition: "pop-top-left",
            duration: 100,
            timingFunction: "ease",
          }}
        />

        <Radio.Group
          value={substation}
          onChange={setSubstation}
          name="substation type"
          label="Select substation type"
        >
          <Flex style={{ alignItems: "center" }}>
            <SegmentedControl
              data={TPType}
              // classNames={classes}
              value={substation}
              // onChange={(e) => setWorkSubjectValue(e)}
              onChange={(e) => setSubstation(e)}
            />
            <span>-</span>
            <TextInput
              style={{ flexGrow: "1" }}
              type="number"
              onChange={(e: any) => setNumberOfTP(e.target.value)}
              value={numberOfTP}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              inputContainer={(children) => (
                <Tooltip
                  label="Enter the number"
                  position="top-start"
                  opened={focused}
                >
                  {children}
                </Tooltip>
              )}
            />
          </Flex>
        </Radio.Group>
        <Textarea
          placeholder="Comment"
          label="Comment"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          style={{ marginBottom: "10px", margin: "20px auto" }}
        />
      
    </>
  );
};

export default Substations;
