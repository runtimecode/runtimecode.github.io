const dsaContent = [
  {
    slug: "two-sum",
    type: "Problem walkthrough",
    title: "Two Sum",
    summary:
      "Find the indices of two distinct array elements whose values add up to a target.",
    updatedAt: "2026-10-18",
    visible: true,
    sections: [
      {
        heading: "Problem",
        body:
          "Given an integer array nums and an integer target, return the indices of two different elements whose values sum to target. Assume exactly one answer exists; the same array element cannot be used twice.",
      },
      {
        heading: "Assumptions and examples",
        body:
          "Input: nums = [2, 7, 11, 15], target = 9. Output: [0, 1].\n\nNegative values and duplicate values are allowed. The required result is the pair of indices, not the pair of values. A valid pair may appear in either order.",
      },
      {
        heading: "Approach",
        body:
          "A brute-force solution checks every pair and takes O(n²) time with O(1) extra space.\n\nFor the optimized solution, scan once while storing each previously seen value and its index in a hash map. For current value x, look for target - x before inserting x. Checking first prevents using the current element twice. This takes O(n) expected time and O(n) space.",
      },
      {
        heading: "Complexity and edge cases",
        body:
          "Expected time: O(n), assuming average constant-time hash-map operations. Space: O(n).\n\nThe lookup-before-insert ordering handles target = 6 with nums = [3, 3] correctly: the first 3 is stored, and the second finds it. Negative numbers work without special handling. If the problem did not guarantee a solution, the method would need an explicit no-result contract.",
      },
    ],
    codeSamples: [
      {
        title: "One-pass hash map solution",
        language: "java",
        code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> indexByValue = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            long complement = (long) target - nums[i];
            if (complement >= Integer.MIN_VALUE && complement <= Integer.MAX_VALUE) {
                Integer complementIndex = indexByValue.get((int) complement);
                if (complementIndex != null) {
                    return new int[] { complementIndex, i };
                }
            }
            indexByValue.put(nums[i], i);
        }

        throw new IllegalArgumentException("No valid pair exists");
    }
}`,
      },
    ],
  },
];

export default dsaContent;
