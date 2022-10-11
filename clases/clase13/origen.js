const randNum = () => Math.floor(Math.random() * 255);

class RGBGenerator {
  generate() {
    let color = `rgb(${randNum()}, ${randNum()}, ${randNum()})`;
    return color;
  }
}
