import { Chip, Flex, Group, createStyles, getStylesRef } from "@mantine/core";
import React, { useState } from "react";
import { substations, substations_real } from "../../db/db";
const useStyles = createStyles((theme) => ({
  substation: {
    marginLeft: "10px",
    borderRadius: "4px,",
  },
}));

 const Substations: React.FC = () => {
  const { classes } = useStyles();
  const [chipValue, setChipValue] = useState([""]);
 
  return (
      <Chip.Group multiple value={chipValue} onChange={setChipValue}>
      <Group  position="left" mt="md">
        {substations_real.map((s) => (
          <Chip className={classes.substation} value={s.value}>
            {s.value}
          </Chip>
        ))}
        </Group>
      </Chip.Group>
    // </Flex>
  );
}

export default Substations;
