let gui;
let settings = {
  textContent: "X-DESIGN",
  textSize: 200,
  textColor: "#FFFFFF",
  bgColor: "#000000",
  numBars: 30,
  barAlpha: 40,
  oscillationSpeed: 0.02,
  oscillationStrength: 50,
  saveImage: function () {
    saveCanvas("animated_text", "png");
  },
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Helvetica-Bold');

  gui = new dat.GUI();
  gui.add(settings, 'textContent').name("文字内容");
  gui.add(settings, 'textSize', 50, 400).name("文字大小");
  gui.addColor(settings, 'textColor').name("文字颜色");
  gui.addColor(settings, 'bgColor').name("背景颜色");
  gui.add(settings, 'numBars', 5, 100).step(1).name("遮罩条数量");
  gui.add(settings, 'barAlpha', 0, 255).step(5).name("遮罩透明度");
  gui.add(settings, 'oscillationSpeed', 0.001, 0.1).step(0.001).name("摆动速度");
  gui.add(settings, 'oscillationStrength', 0, 200).step(1).name("摆动强度");
  gui.add(settings, 'saveImage').name("保存图像");
}

function draw() {
  background(settings.bgColor);
  textSize(settings.textSize);
  textAlign(CENTER, CENTER);
  textFont('Helvetica-Bold');

  for (let x = 0; x < width; x += width / settings.numBars) {
    drawingContext.save();
    noStroke();
    fill(0, settings.barAlpha);
    rect(x, 0, width / settings.numBars, height);
    drawingContext.clip();

    // --- 正确方式：先平移，再绘制 ---
    push();
    translate(
      width / 2 + settings.oscillationStrength * cos(frameCount * settings.oscillationSpeed + 3 * noise(x)),
      height / 2
    );
    fill(settings.textColor);
    text(settings.textContent, 0, 0);
    pop();

    drawingContext.restore();
  }

  // --- 版权信息 ---
  fill(255);
  noStroke();
  textSize(12);
  textAlign(RIGHT, BOTTOM);
  text(
    "Created by @Zhijie-Yi @LuANyxxx\n©️All my products are available for personal and commercial projects",
    width - 10,
    height - 10
  );
}

