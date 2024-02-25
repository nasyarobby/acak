export default function genWords(input: string, config?: {
    sep?: string,
    groupBy?: string,
    pickerFn?: (arr: string[]) => string
}) {

    const sep = config?.sep || '|'
    const groupBy = config?.groupBy || '[]'
    const startGroupToken = groupBy[0];
    const endGroupToken = groupBy[1];
    const pickerFn = config?.pickerFn ? config.pickerFn : (arr: string[]) => {
        const min = 0;
        const max = arr.length;
        const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
        return arr[randInt]
    }

    if (input.indexOf(startGroupToken) < 0) {
      if (input.indexOf(sep) > -1) 
        return genWords(pickerFn(input.split(sep)), config);
      else {
        return input;
      }
    }
  
    // input contain group token
    let solved = input
    let stacks = []
    for (let i = 0; i < input.length; i++) {
       if(input[i] == startGroupToken) {
          stacks.push(i)
       }
       else if(input[i] == endGroupToken) {
          let start = stacks.pop()

          if(start === undefined) {
            throw new Error("Invalid string format. Expected ")
          }

          let end = i
          let group = input.substring(start + 1, end)
          let words = genWords(group, config)
          solved = genWords(solved.replace(startGroupToken +group+ endGroupToken, words), config) 
        } 
    }

    return solved
  }