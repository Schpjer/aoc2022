package main

import (
	"os"
	"strconv"
	"strings"
)

type arrayHolder struct {
	arrayToComapre []int
	arrayToCheck   []int
}

func main() {
	content, _ := os.ReadFile("input.txt")
	array := strings.Split(string(content), "\n")
	partOne(array)
	partTwo(array)

}

func partTwo(array []string) int {
	var result = 0
	for _, element := range array {
		arrayTwo := strings.Split(element, ",")
		firstRangeInt := convertStringArrayToIntArray(strings.Split(arrayTwo[0], "-"))
		secondRangeInt := convertStringArrayToIntArray(strings.Split(arrayTwo[1], "-"))
		var firstIntArray = convertRangeToIntArray(firstRangeInt[0], firstRangeInt[1])
		var secondIntArray = convertRangeToIntArray(secondRangeInt[0], secondRangeInt[1])
		var shouldAdd = false
		for _, element := range firstIntArray {
			if contains(secondIntArray, element) {
				shouldAdd = true
			}
		}
		if shouldAdd {
			result++
		}
	}
	return result
}

func partOne(array []string) int {
	var result = 0
	for _, element := range array {
		arrayTwo := strings.Split(element, ",")
		firstRangeInt := convertStringArrayToIntArray(strings.Split(arrayTwo[0], "-"))
		secondRangeInt := convertStringArrayToIntArray(strings.Split(arrayTwo[1], "-"))
		var firstIntArray = convertRangeToIntArray(firstRangeInt[0], firstRangeInt[1])
		var secondIntArray = convertRangeToIntArray(secondRangeInt[0], secondRangeInt[1])
		var shouldAdd = true
		var arrayHolder = getArrayHolder(firstIntArray, secondIntArray)

		for _, element := range arrayHolder.arrayToCheck {
			shouldAdd = contains(arrayHolder.arrayToCheck, element)
			if !shouldAdd {
				break
			}
		}
		if shouldAdd {
			result += 1
		}
	}
	return result
}

func getArrayHolder(arrayOne []int, arrayTwo []int) arrayHolder {
	var arrayToCheck = []int{}
	var arrayToCompare = []int{}
	if len(arrayTwo) < len(arrayOne) {
		arrayToCheck = arrayTwo
		arrayToCompare = arrayOne
	} else {
		arrayToCheck = arrayOne
		arrayToCompare = arrayTwo
	}
	return arrayHolder{arrayToCompare, arrayToCheck}
}

func convertRangeToIntArray(startIndex int, endIndex int) []int {
	var output []int
	for i := startIndex; i <= endIndex; i++ {
		output = append(output, i)
	}
	return output
}

func contains(s []int, e int) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func convertStringArrayToIntArray(input []string) []int {
	var output []int
	for _, element := range input {
		i, _ := strconv.Atoi(element)
		output = append(output, i)
	}
	return output
}
