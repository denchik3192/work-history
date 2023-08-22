import { Box, Flex, Radio, Select, TextInput, Textarea, Tooltip } from '@mantine/core';
import React, { useState } from 'react';
import { TPType, substations_real } from '../../db/db';

const Substations = ({
  substation,
  setSubstation,
  numberOfTP,
  setNumberOfTP,
  setCommentValue,
  commentValue,
}: any): JSX.Element => {
  const [searchValue, onSearchChange] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <>
      <Box w={'50%'}>
        <Select
          w={'100%'}
          label="Select substation"
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          placeholder="Pick one"
          searchable
          nothingFound="No options"
          data={substations_real}
          transitionProps={{ transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }}
        />
        <Radio.Group
          value={substation}
          onChange={setSubstation}
          name="substation type"
          label="Select substation type"
          // description="This is anonymous"
          // withAsterisk
        >
          <Flex>
            {TPType.map((tp, idx) => (
              <Radio
                onChange={() => setSubstation(tp.value)}
                key={idx}
                value={tp.value}
                label={tp.label}
                color="indigo"
                style={{ marginRight: '10px' }}
              />
            ))}
            <TextInput
              type="number"
              onChange={(e: any) => setNumberOfTP(e.target.value)}
              value={numberOfTP}
              label="Number of substation"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              inputContainer={(children) => (
                <Tooltip label="Enter the number" position="top-start" opened={focused}>
                  {children}
                </Tooltip>
              )}
            />
          </Flex>
        </Radio.Group>
        -
        <Textarea
          placeholder="Comment"
          label="Comment"
          withAsterisk
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          style={{ marginBottom: '10px', margin: '20px auto' }}
        />
      </Box>
    </>
  );
};

export default Substations;
