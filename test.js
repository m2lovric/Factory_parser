(async() => {
  let text = "";
  let objectsArr = [];
  const regEx = /([{}])/g;

  await fetch('primjer1.txt')
    .then(res => {
      return res.text();
    })
    .then(data => {
      text = data;
    })

  const parts = text.split(regEx);

  //removing first and last empty element
  parts[0] === "" ? parts.shift() : '';
  parts[parts.length - 1] === "" ? parts.splice(-1, 1) : '';

  //check if first part of string is text
  if (parts[0] !== "{") {
    objectsArr.push({ type: "text", content: parts[0] });
    parts.shift();
  }

  //spliting elements with attributes
  const elWithAttributes = (parts, num) => {
    const elWithAtt = parts[num + 1];

    let elements = elWithAtt.split('=');
    const attributes = [elements[1]];

    let leftSide = elements[0].split(RegExp(/\n| /));
    const type = leftSide[0];
    attributes.unshift(leftSide[1]);    

    const obj = {
      type,
      attributes: {}
    };

    for (let i = 0; i < attributes.length; i+=2) {
      let num = i;
      let value = attributes[num + 1];
      value = value[value.length - 1] === "/" ? value.slice(0, value.length - 1) : value;
      value = value.slice(1, value.length - 1);
      obj.attributes[attributes[num]] = value;
      
    }

    objectsArr.push(obj);
  }

  for (let i = 0; i < parts.length; i++) {
    let num = i;
    if (parts[num] === "{" && parts[num + 2] === "}") {
      if (parts[num + 1].endsWith("/")) {
        elWithAttributes(parts, num);
      } else if (parts[num + 1].startsWith("/")) {
        parts[num + 3] === undefined ? '' : objectsArr.push({ type: "text", content: parts[num + 3] });
      } else {
        if (parts[num + 1].includes("=")) {
          elWithAttributes(parts, num);
        } else {
          objectsArr.push({ type: parts[num + 1], content: parts[num + 3] });
        }
      }
    }    
  }

  console.log(objectsArr);
})();