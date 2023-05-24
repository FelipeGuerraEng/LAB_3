var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 17;
camera.position.x = -18;
camera.position.y = 5;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(
  new THREE.Color('hsl(30, 100%, 75%)'),
  1.0
);
//keyLight.position.set(-100, 0, 100);
keyLight.position.set(-10, 10, 10);

var fillLight = new THREE.DirectionalLight(
  new THREE.Color('hsl(240, 100%, 75%)'),
  0.75
);
//fillLight.position.set(100, 0, 100);
fillLight.position.set(10, 0, 10);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
//backLight.position.set(100, 0, -100).normalize();
backLight.position.set(10, 0, -10).normalize();

var light = new THREE.AmbientLight(0x404040);
scene.add(light);

//scene.background = new THREE.Color( 0xffffff );
renderer.setClearColor(new THREE.Color('skyblue'));
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var textureLoader = new THREE.TextureLoader();

var textures1 = {
  Glass: textureLoader.load('/assets/objects/glass_diff.png'),
  Body: textureLoader.load('/assets/objects/tex.png'),
};

// Ahora, cuando cargues tus materiales con MTLLoader, puedes asignar manualmente las texturas cargadas
// a tus materiales. Aquí hay un ejemplo de cómo podrías hacerlo:
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('/assets/');
mtlLoader.load('objects/Helicopter.mtl', function (materials) {
  materials.preload();

  materials.materials.Glass.map = textures1.Glass;
  materials.materials.Body.map = textures1.Body;

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('/assets/');
  objLoader.load('objects/Helicopter.obj', function (object) {
    object.position.x = -1;
    object.position.z = 14;
    object.scale.set(0.12, 0.12, 0.12);
    object.rotateY(Math.PI / 2);
    scene.add(object);
  });
});

var textureLoader = new THREE.TextureLoader();

// Carga las texturas
var factoryTexture = textureLoader.load(
  '/assets/objects/Power Plant Mid_Diffuse.01 - Default.png'
);
var factoryBumpMap = textureLoader.load(
  '/assets/objects/Map__33_Normal_Bump.tga'
);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('/assets/objects/');
mtlLoader.load('Power_Plant_Mid.mtl', function (materials) {
  materials.preload();

  // Asigna las texturas y el mapa de relieve al material 'Factory'
  var factoryMaterial = materials.materials.Factory;
  if (factoryMaterial) {
    factoryMaterial.map = factoryTexture;
    factoryMaterial.bumpMap = factoryBumpMap;
    factoryMaterial.bumpScale = 0.3; // El factor de escalado para el mapa de relieve (bump map)
  }

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('/assets/objects/');
  objLoader.load('Power_Plant_Mid.obj', function (object) {
    object.scale.set(0.22, 0.22, 0.22);
    object.rotateY(Math.PI / 2);
    scene.add(object);
  });
});

var textureLoader = new THREE.TextureLoader();

// Carga la textura de camuflaje
var camouflageTexture = textureLoader.load(
  '/assets/objects/medium_camouflage.jpg'
);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('/assets/objects/');
mtlLoader.load(
  'BRDM-3_Armored_Reconnaissance_Vehicle.mtl',
  function (materials) {
    materials.preload();

    // Asigna la textura de camuflaje a todos los materiales que tienen el nombre 'Military_1_#5'
    Object.values(materials.materials).forEach(function (material) {
      if (material.name === 'Military_1_#5') {
        material.map = camouflageTexture;
      }
    });

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/assets/objects/');
    objLoader.load(
      'BRDM-3_Armored_Reconnaissance_Vehicle.obj',
      function (object) {
        object.position.x -= 8;
        object.scale.set(0.0009, 0.0009, 0.0009);
        scene.add(object);
      }
    );
  }
);

/*var DDSLoader = new THREE.DDSLoader();

var textures = {
  ac2965d8_dds: DDSLoader.load('/assets/objects/ac2965d8.dds'),
  '6bd0da5e_dds': DDSLoader.load('/assets/objects/6bd0da5e.dds'),
  '27608a35_dds': DDSLoader.load('/assets/objects/27608a35.dds'),
  '79bf1742_dds': DDSLoader.load('/assets/objects/79bf1742.dds'),
  '9dd96982_dds': DDSLoader.load('/assets/objects/9dd96982.dds'),
};

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('/assets/objects/');
mtlLoader.load('armytruck.mtl', function (materials) {
  materials.preload();

  Object.keys(textures).forEach(function (materialName) {
    var material = materials.materials[materialName];
    if (material) {
      material.map = textures[materialName];
    }
  });

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('/assets/objects/');
  objLoader.load('armytruck.obj', function (object) {
    object.position.x -= 4;
    object.scale.set(0.0005, 0.0005, 0.0005);
    scene.add(object);
  });
});*/

/*var objLoader = new THREE.OBJLoader();
objLoader.setPath('/assets/');
objLoader.load('objects/Lowpoly_modern_sedan.obj', function (object) {
  //object.position.x -= 0;
  object.position.x -= 5;
  scene.add(object);
});*/

var animate = function () {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

animate();
