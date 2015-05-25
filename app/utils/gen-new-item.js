var id = 0;

export default function genNewItem() {
  id += 1;
  return {
    id: id,
    color: '#' + randomHex(6),
    width: randomInt(200, 1000),
  };
}

function randomInt(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1));
}

function randomHex(ndigits) {
  var string = "";
  for (var i = 0; i < ndigits; i++) {
    string += "0123456789ABCDEF".charAt(randomInt(0, 15));
  }
  return string;
}
