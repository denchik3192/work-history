import { Progress, RingProgress, Text, Tooltip } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectWorkplaceStats } from "../store/sortHistoryBy/selectors";
import { colors } from "../db/colors";

function Statistic() {
  const numberOfRecords = useSelector(
    (state: RootState) => state.history.length
  );
  const workplaceStats = useSelector(selectWorkplaceStats);
  return (
    <>
      
      <Progress
        mt="md"
        size="xl"
        radius="sm"
        style={{ textTransform: "capitalize" }}
        sections={Object.entries(workplaceStats).map(
          (el: any, idx: number) => ({
            value: el[1],
            color: colors[idx],
            label: el[0],
          })
        )}
      />
      <RingProgress
        sections={[{ value: numberOfRecords, color: "teal" }]}
        label={
          <Text color="blue" weight={500} align="center" size="l">
            {numberOfRecords} rec-s
          </Text>
        }
      />
    </>
  );
}

export default Statistic;
