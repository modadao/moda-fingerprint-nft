function doMapping(data, limit, start) {
  const coords = new Map();

  // console.log(`x length: ${data.coords.x.length}`);
  // console.log(data.coords.x);
  // console.log(data.coords.y);

  for (let i = 0; i < data.coords.x.length; i++) {
    const currentX = data.coords.x[i];
    // console.log(currentX);

    const currentY = data.coords.y[i];
    // console.log(currentY);

    if (coords.has(currentX)) {
      const y_array = coords.get(currentX);
      y_array.push(currentY);
      coords.set(currentX, y_array);
    } else {
      const y_array = [];
      y_array.push(currentY);
      coords.set(currentX, y_array);
    }
  }

  const x = []; // array of x values
  const y = []; // array of y array values

  const values = Array.from(coords.values());
  const keys = Array.from(coords.keys());

  const j = limit === 0 ? values.length : limit;  //limit < values.length ? limit : values.length;

  for (let i = start; i < start + j; i++) {
    if (keys[i] !== undefined && values[i] !== undefined) {
      x.push(keys[i]);
      y.push(values[i]);
    }
  }

  for (let i = 0; i < x.length; i++) {
    console.log(x[i] + " => " + y[i]);
  }

  return [x, y];
}

module.exports = { doMapping };
