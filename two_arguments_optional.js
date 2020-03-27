

const readTwoArgs = (input, seperator_args = ":", separator_elements = ",") => {
  let splits = input;
  let st_second = splits.split(seperator_args && separator_elements);
  let arr = []

  for (let i = 0; i < st_second.length; i++) {
      let st_t = st_second[ i ];
      if (st_t.search(seperator_args) != -1) {
          let right_arg = "";
          let left_arg = "";
          for (let j = st_t.search(seperator_args) + 1; j < st_second[ i ].length; j++) {
              right_arg += st_second[ i ][ j ];
          }
          for (let jy = 0; jy < st_t.search(seperator_args); jy++) {
              left_arg += st_second[ i ][ jy ];
          }
          let obj = Object.create(null);
          Object.defineProperty(obj, "left", {value: Number(left_arg)});
          Object.defineProperty(obj, "right", {value: Number(right_arg)});
          
         arr.push(obj);
      }
      if (st_second[ i ].search(seperator_args) == -1) {
        arr.push(Number(st_second[ i ].trim()));
      }
  }
  return arr
}

// Examples:
var from_gui_text = "10, 15:10, 4:50, 30, 4, 70";
var argument_read = readTwoArgs(from_gui_text);

console.log(argument_read[3]);       // Outputs: 30
console.log(argument_read[1].left) ; // Outputs: 15
console.log(argument_read[1].right); // Outputs: 10
