import {
  Group,
  Paper,
  SimpleGrid,
  Text,
  RingProgress,
  Progress,
  Title,
  Badge,
} from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./Statistic.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectWorkplaceStats } from "../store/sortHistoryBy/selectors";
import { colors } from "../db/colors";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: "Revenue", icon: "receipt", value: "13,456", diff: 34 },
  { title: "Profit", icon: "coin", value: "4,145", diff: -13 },
  { title: "Coupons usage", icon: "discount", value: "745", diff: 18 },
  { title: "New customers", icon: "user", value: "188", diff: -30 },
] as const;

export function Statistic() {
  const numberOfRecords = useSelector(
    (state: RootState) => state.history.items.length
  );
  console.log(numberOfRecords);
  
  const workplaceStats = useSelector(selectWorkplaceStats);
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <>
        <Paper withBorder p="md" radius="md" key={stat.title}>
          <Group style={{ justifyContent: "space-between" }}>
            <Text size="xs" c="dimmed" className={classes.title}>
              {stat.title}
            </Text>
            <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
          </Group>

          <Group align="flex-end" mt={25}>
            <Text className={classes.value}>{stat.value}</Text>
            <Text
              c={stat.diff > 0 ? "teal" : "red"}
              fz="sm"
              fw={500}
              className={classes.diff}
            >
              <span>{stat.diff}%</span>
              <DiffIcon size="1rem" stroke={1.5} />
            </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
            Compared to previous month
          </Text>
        </Paper>
      </>
    );
  });

  return (
    <div className={classes.root}>
      <Group>
        <Title order={1}> Number of records :</Title>
        <Badge variant="dot" color="violet" size="xl" radius="sm">
          {numberOfRecords}
        </Badge>
      </Group>

      <Progress
        mt="md"
        mb="md"
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
      <Group>{stats}</Group>
    </div>
  );
}

export default Statistic;
