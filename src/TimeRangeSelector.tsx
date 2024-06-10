import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TimeRangeSelector: React.FC = () => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<number[]>([]);
  const [excludedTime, setExcludedTime] = useState<string[]>(["13-14", "17"]);

  const timeSlots = Array.from({ length: 25 }, (_, i) => i);

  const toggleTimeSlot = (timeSlot: number) => {
    if (selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(t => t !== timeSlot));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
    }
    console.log({
      selectedTimeRange: formatSelectedTimeRange(selectedTimeSlots),
      excludedTime,
    });
  };

  const isExcluded = (timeSlot: number): boolean => {
    return excludedTime.some(range => {
      const [start, end] = range.split('-').map(Number);
      if (end !== undefined) {
        // It's a range
        return timeSlot >= start && timeSlot <= end;
      } else {
        // It's a single time slot
        return timeSlot === start;
      }
    });
  };
  

  const formatSelectedTimeRange = (slots: number[]): string[] => {
    if (slots.length === 0) return [];
    slots.sort((a, b) => a - b);

    const ranges: string[] = [];
    let start = slots[0];
    let end = slots[0];

    for (let i = 1; i < slots.length; i++) {
      if (slots[i] === end + 1) {
        end = slots[i];
      } else {
        ranges.push(`${start}-${end}`);
        start = slots[i];
        end = slots[i];
      }
    }
    ranges.push(`${start}-${end}`);
    return ranges;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Time Range:</Text>
      <View style={styles.timeSlots}>
        {timeSlots.map(timeSlot => (
          <Button
            key={timeSlot}
            onPress={() => !isExcluded(timeSlot) && toggleTimeSlot(timeSlot)}
            title={`${timeSlot}:00`}
            color={
              isExcluded(timeSlot)
                ? styles.excluded.backgroundColor
                : selectedTimeSlots.includes(timeSlot)
                ? styles.selected.backgroundColor
                : styles.timeSlot.backgroundColor
            }
          />
        ))}
      </View>
      <Text style={styles.result}>
        Selected Time Range: {formatSelectedTimeRange(selectedTimeSlots).join(', ')}
      </Text>
      <Text style={styles.result}>Excluded Time: {excludedTime.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  timeSlot: {
    width: '16.666%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'lightgray'
  },
  selected: {
    backgroundColor: 'lightgreen',
  },
  excluded: {
    backgroundColor: 'lightcoral',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default TimeRangeSelector;
