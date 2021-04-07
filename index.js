const getData = async () => {
  let text;

  await fetch('primjer2.txt')
    .then(res => {
      return res.text();
    })
    .then(data => {
      text = data;
    })

  console.log(text);

  const bracketLocation = (text) => {
    const brackets = [];

    for (let i in text) {
      i === "0" && text[i] !== "{" ? brackets.push(-1) : ""; //set first location to -1 if there is no obj bracket on beginning of text
      if (text[i] === "{") {
        brackets.push(i);
      }else if (text[i] === "}") {
        brackets.push(i);
      }
    }
    console.log(brackets);
    return brackets;
  }

  const getObjects = (text) => {
    const brackets = bracketLocation(text);
    const parts = [];

    for (let i = 0; i < brackets.length - 2; i+=2) {
      let num = i;

      const first = parseInt(brackets[num]);
      const second = parseInt(brackets[num += 1]);
      
      parts.push(text.slice(first + 1, second));
      parts.push(text.slice(second + 1, parseInt(brackets[num += 1])));
    }

    return parts;
  }

  const removeClosingTags = (text) => {
    const parts = getObjects(text);
    console.log(parts);
    const filteredParts = parts.filter(el => el[0] !== "/");
    console.log(filteredParts);
  }

  removeClosingTags(text);
}

getData();