var defaultThreeUniforms = ['normalMatrix', 'viewMatrix', 'projectionMatrix', 'position', 'normal', 'modelViewMatrix', 'uv', 'uv2', 'modelMatrix'];

function ShaderRuntime() {}

ShaderRuntime.prototype = {
    mainCamera: null,
    cubeCameras: {},
    reserved: {
        time: null,
        cameraPosition: null
    },
    umap: {
        float: {
            type: 'f',
            value: 0
        },
        int: {
            type: 'i',
            value: 0
        },
        vec2: {
            type: 'v2',
            value: function value() {
                return new THREE.Vector2();
            }
        },
        vec3: {
            type: 'v3',
            value: function value() {
                return new THREE.Vector3();
            }
        },
        vec4: {
            type: 'v4',
            value: function value() {
                return new THREE.Vector4();
            }
        },
        samplerCube: {
            type: 't'
        },
        sampler2D: {
            type: 't'
        }
    },
    getUmap: function getUmap(type) {
        var value = this.umap[type].value;
        return typeof value === 'function' ? value() : value;
    },
    load: function load(sourceOrSources, callback) {
        var _this = this;

        var sources = sourceOrSources,
        onlyOneSource = typeof sourceOrSources === 'string';

        if (onlyOneSource) {
            sources = [sourceOrSources];
        }

        var loadedShaders = new Array(sources.length),
        itemsLoaded = 0;

        var loadSource = function loadSource(index, source) {
            var loader = new THREE.FileLoader();

            loader.load(source, function(json) {
                var parsed;

                try {
                    parsed = JSON.parse(json);
                    delete parsed.id; // Errors if passed to rawshadermaterial :(
                } catch(e) {
                    throw new Error('Could not parse shader' + source + '! Please verify the URL is correct.');
                }
				
                _this.add(parsed.name, parsed);

                loadedShaders[index] = parsed;

                if (++itemsLoaded === sources.length) {
                    callback(onlyOneSource ? loadedShaders[0] : loadedShaders);
                }
            });
        };

        for (var x = 0; x < sources.length; x++) {
            loadSource(x, sources[x]);
        }
    },
	
	//Load json code directly
    loadJSON: function load(sourceOrSources, callback) {
        var _this = this;

        var sources = sourceOrSources,
        onlyOneSource = typeof sourceOrSources === 'string';

        if (onlyOneSource) {
            sources = [sourceOrSources];
        }

        var loadedShaders = new Array(sources.length),
        itemsLoaded = 0;

        var loadJSONCode = function loadJSONCode(index, source) {
			
			var parsed;

			parsed = source;
			delete parsed.id; // Errors if passed to rawshadermaterial :(
			

			_this.add(parsed.name, parsed);

			loadedShaders[index] = parsed;

			if (++itemsLoaded === sources.length) {
				callback(onlyOneSource ? loadedShaders[0] : loadedShaders);
			}
			
			
        };

        for (var x = 0; x < sources.length; x++) {
            loadJSONCode(x, sources[x]);
        }
    },
    registerCamera: function registerCamera(camera) {
        if (! (camera instanceof THREE.Camera)) {
            throw new Error('Cannot register a non-camera as a camera!');
        }

        this.mainCamera = camera;
    },
    registerCubeCamera: function registerCubeCamera(name, camera) {
        if (!camera.renderTarget) {
            throw new Error('Cannot register a non-camera as a camera!');
        }

        this.cubeCameras[name] = camera;
    },
    unregisterCamera: function unregisterCamera(name) {
        if (name in this.cubeCameras) {
            delete this.cubeCameras[name];
        } else if (name === this.mainCamera) {
            delete this.mainCamera;
        } else {
            throw new Error('You never registered camera ' + name);
        }
    },
    updateSource: function updateSource(identifier, config, findBy) {
        findBy = findBy || 'name';

        if (!this.shaderTypes[identifier]) {
            throw new Error('Runtime Error: Cannot update shader ' + identifier + ' because it has not been added.');
        }

        var newShaderData = this.add(identifier, config),
        shader,
        x;

        for (x = 0; shader = this.runningShaders[x++];) {
            if (shader[findBy] === identifier) {
                extend(shader.material, omit(newShaderData, 'id'));
                shader.material.needsUpdate = true;
            }
        }
    },
    renameShader: function renameShader(oldName, newName) {
        var x, shader;

        if (! (oldName in this.shaderTypes)) {
            throw new Error('Could not rename shader ' + oldName + ' to ' + newName + '. It does not exist.');
        }

        this.shaderTypes[newName] = this.shaderTypes[oldName];
        delete this.shaderTypes[oldName];

        for (x = 0; shader = this.runningShaders[x++];) {
            if (shader.name === oldName) {
                shader.name = newName;
            }
        }
    },
    get: function get(identifier) {
        var shaderType = this.shaderTypes[identifier];

        if (!shaderType.initted) {
            this.create(identifier);
        }

        return shaderType.material;
    },
    add: function add(shaderName, config) {
        var newData = clone(config),
        uniform;
        newData.fragmentShader = config.fragment;
        newData.vertexShader = config.vertex;
        delete newData.fragment;
        delete newData.vertex;

        for (var uniformName in newData.uniforms) {
            uniform = newData.uniforms[uniformName];

            if (uniform.value === null) {
                newData.uniforms[uniformName].value = this.getUmap(uniform.glslType);
            }
        }

        if (shaderName in this.shaderTypes) {
            // maybe not needed? too sleepy, need document
            extend(this.shaderTypes[shaderName], newData);
        } else {
            this.shaderTypes[shaderName] = newData;
        }

        return newData;
    },
    create: function create(identifier) {
        var shaderType = this.shaderTypes[identifier];
        var keys = Object.keys(shaderType); // Three's shadermaterial id is not assignable, so filter it out
        var withoutId = {};

        for (var i = 0; i < keys.length; i++) {
            if (keys[i] !== 'id') {
                withoutId[keys[i]] = shaderType[keys[i]];
            }
        }

        shaderType.material = new THREE.RawShaderMaterial(withoutId);
        this.runningShaders.push(shaderType);
        shaderType.init && shaderType.init(shaderType.material);
        shaderType.material.needsUpdate = true;
        shaderType.initted = true;
        return shaderType.material;
    },
    updateRuntime: function updateRuntime(identifier, data, findBy) {
        findBy = findBy || 'name';
        var shader, x, uniformName, uniform; // This loop does not appear to be a slowdown culprit
        for (x = 0; shader = this.runningShaders[x++];) {
            if (shader[findBy] === identifier) {
                for (uniformName in data.uniforms) {
                    if (uniformName in this.reserved) {
                        continue;
                    }

                    if (uniformName in shader.material.uniforms) {
                        uniform = data.uniforms[uniformName]; // this is nasty, since the shader serializes
                        // CubeCamera model to string. Maybe not update it at
                        // all?
                        if (uniform.type === 't' && typeof uniform.value === 'string') {
                            uniform.value = this.cubeCameras[uniform.value].renderTarget;
                        }

                        shader.material.uniforms[uniformName].value = data.uniforms[uniformName].value;
                    }
                }
            }
        }
    },
    // Update global shader uniform values
    updateShaders: function updateShaders(time, obj) {
        var shader, x;
        obj = obj || {};

        for (x = 0; shader = this.runningShaders[x++];) {
            for (var uniform in obj.uniforms) {
                if (uniform in shader.material.uniforms) {
                    shader.material.uniforms[uniform].value = obj.uniforms[uniform];
                }
            }

            if ('cameraPosition' in shader.material.uniforms && this.mainCamera) {
                shader.material.uniforms.cameraPosition.value = this.mainCamera.position.clone();
            }

            if ('viewMatrix' in shader.material.uniforms && this.mainCamera) {
                shader.material.uniforms.viewMatrix.value = this.mainCamera.matrixWorldInverse;
            }

            if ('time' in shader.material.uniforms) {
                shader.material.uniforms.time.value = time;
            }
        }
    },
    shaderTypes: {},
    runningShaders: []
}; // Convenience methods so we don't have to include underscore
function extend() {
    var length = arguments.length,
    obj = arguments[0];

    if (length < 2) {
        return obj;
    }

    for (var index = 1; index < length; index++) {
        var source = arguments[index],
        keys = Object.keys(source || {}),
        l = keys.length;

        for (var i = 0; i < l; i++) {
            var key = keys[i];
            obj[key] = source[key];
        }
    }

    return obj;
}

function clone(obj) {
    return extend({},
    obj);
}

function omit(obj) {
    var cloned = clone(obj),
    x,
    key;

    for (x = 0; key = (_ref = x+++1, _ref < 1 || arguments.length <= _ref ? undefined: arguments[_ref]);) {
        var _ref;

        delete cloned[key];
    }

    return cloned;
}
