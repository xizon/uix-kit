/*!
 * 
 * ## Project Name        :  Uix Kit
 * ## Project Description :  A free web kits for fast web design and development, compatible with Bootstrap v4.
 * ## Project URL         :  https://uiux.cc
 * ## Version             :  4.2.3
 * ## Based on            :  Uix Kit (https://github.com/xizon/uix-kit)
 * ## Last Update         :  April 11, 2020
 * ## Created by          :  UIUX Lab (https://uiux.cc) (uiuxlab@gmail.com)
 * ## Released under the MIT license.
 * 	
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "9658e2cd4499e44914f3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(131)(__webpack_require__.s = 131);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* 
 *************************************
 * Parallax Effect
 *
 * @param  {Number} speed       - The speed of movement between elements.
 * @param  {String} transition  - Transition time can simulate easing effect.
 * @param  {Object} bg            - Specify the background display. Default value: { enable: true, xPos: '50%' }
 * @return {Void}
 *
 *************************************
 */
(function ($) {
  'use strict';

  $.fn.UixParallax = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      speed: 0.25,
      transition: 'all 0.4s cubic-bezier(0, 0, 0.34, 0.96) 0s',
      bg: {
        enable: true,
        xPos: '50%'
      }
    }, options);
    this.each(function () {
      var bgEff = settings.bg,
          $this = $(this),
          bgXpos = '50%',
          speed = -parseFloat(settings.speed);

      if (bgEff) {
        bgEff = settings.bg.enable;
        bgXpos = settings.bg.xPos;
      } //Prohibit transition delay


      $this.css({
        'transition': 'none'
      }); // Please do not use scroll's off method in each

      $(window).on('scroll.UixParallax touchmove.UixParallax', function (e) {
        scrollUpdate();
      }); //Initialize the position of the background

      if (bgEff) {
        //background parallax
        TweenMax.set($this, {
          backgroundPosition: bgXpos + ' ' + -$this.offset().top * speed + 'px'
        });
      } else {
        //element parallax
        TweenMax.set($this, {
          y: 0
        });
      }

      function scrollUpdate() {
        var spyTop = $this[0].getBoundingClientRect().top;

        if (bgEff) {
          //background parallax
          TweenMax.set($this, {
            css: {
              'background-position': bgXpos + ' ' + (0 - spyTop * speed) + 'px',
              'transition': settings.transition
            }
          });
        } else {
          //element parallax
          TweenMax.set($this, {
            css: {
              'transform': 'matrix(1, 0, 0, 1, 0, ' + (0 - spyTop * speed) + ')',
              'transition': settings.transition
            }
          });
        }
      }
    });
  };
})(jQuery);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Render Custom Select
 *
 * @param  {String} selector             - The current selector.
 * @param  {String} targetWrapper        - Wrapper of the selector.
 * @param  {String} trigger              - Trigger of the selector.
 * @param  {String} itemsWrapper         - Selector's options container.
 * @param  {Element} item                 - Each option of the selector.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderCustomSelect = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      selector: '.uix-controls__select',
      targetWrapper: '.uix-controls__select-wrapper',
      trigger: '.uix-controls__select-trigger',
      itemsWrapper: '.uix-controls__select__option-container',
      item: '.uix-controls__select__option'
    }, options);
    this.each(function () {
      $(settings.selector).not('.js-uix-new').each(function () {
        var $this = $(this);
        var classes = $this.attr('class'),
            id = $this.attr('id'),
            name = $this.attr('name'),
            labelText = $this.find('> span').html(),
            dataExist = $this.data('exist');
        var template = '';

        if (_typeof(dataExist) === ( true ? "undefined" : undefined) && dataExist != 1) {
          template = '<div class="' + classes + ' js-uix-new">';
          template += '<span class="uix-controls__select-trigger">' + $this.find('select').attr('placeholder') + '</span><ins class="uix-controls__bar"></ins><ins class="uix-controls__basic-bar"></ins>';
          template += '<div class="uix-controls__select__option-container">';
          $this.find('select option').each(function (index) {
            var selected = '';

            if ($(this).is(':selected')) {
              selected = 'is-active';
            }

            template += '<span class="uix-controls__select__option ' + selected + '" data-value="' + $(this).attr('value') + '">' + $(this).html() + '</span>';
          });
          template += '</div></div>';

          if (_typeof(labelText) != ( true ? "undefined" : undefined) && labelText != '') {
            template += '<span class="uix-controls__select-label">' + labelText + '</span>';
          }

          $this.wrap('<div class="' + settings.targetWrapper.replace('.', '') + ' ' + ($this.hasClass('uix-controls--line') ? 'uix-controls--line' : '') + ' ' + ($this.hasClass('is-fullwidth') ? 'is-fullwidth' : '') + ' ' + ($this.hasClass('is-disabled') ? 'is-disabled' : '') + '"></div>');
          $this.hide();
          $this.after(template); //Prevent the form from being initialized again

          $(this).data('exist', 1);
        }
      }); //Show/Hide Selector

      $(document).off('click.FORM_CUSTOM_SELECT').on('click.FORM_CUSTOM_SELECT', settings.trigger, function (e) {
        e.preventDefault();
        var $selectWrapper = $(this).closest(settings.targetWrapper),
            $selectCurWrapper = $selectWrapper.find(settings.selector + '.js-uix-new');
        $selectCurWrapper.addClass('is-opened');
      }); //Do not add off() to this

      $(document.body).on('click', function (e) {
        if (e.target.className != '' && _typeof(e.target.className) != ( true ? "undefined" : undefined) && Object.prototype.toString.call(e.target.className) != '[object SVGAnimatedString]') {
          if (e.target.className.indexOf('uix-controls__select__option') < 0) {
            $(settings.selector + '.js-uix-new').removeClass('is-opened');
          }
        }
      }); //Set the default selector text

      $(settings.selector + '.js-uix-new').each(function (index) {
        $(this).find(settings.trigger).text($(this).find(settings.item + '.is-active').html());
      }); //Change Event Here
      //Prevents the triggering of multiple change events

      $(document).off('click.FORM_CUSTOM_SELECT_ITEM').on('click.FORM_CUSTOM_SELECT_ITEM', settings.item, function (e) {
        e.preventDefault();
        var $selectWrapper = $(this).closest(settings.targetWrapper),
            $selectCurWrapper = $selectWrapper.find(settings.selector + '.js-uix-new'),
            curVal = $(this).data('value'); //Close the selector

        $selectCurWrapper.removeClass('is-opened'); //Set the selector text

        $selectCurWrapper.find(settings.trigger).text($(this).html()).addClass('is-active'); //Activate this option

        $selectCurWrapper.find(settings.item).removeClass('is-active');
        $(this).addClass('is-active'); //Set select option 'selected', by value

        $selectWrapper.find('select').val(curVal);
        $selectWrapper.find('select option').removeAttr('selected');
        $selectWrapper.find('select option[value="' + curVal + '"]').attr('selected', 'selected').change();
      }); //Synchronize to the original select change event

      $(settings.selector).not('.js-uix-new').each(function () {
        var $this = $(this).find('select'),
            $cusSelect = $this.closest(settings.targetWrapper).find(settings.selector + '.js-uix-new');
        var newOptions = '';
        $this.closest(settings.targetWrapper).find('select option').each(function (index) {
          var selected = '';

          if ($(this).is(':selected')) {
            selected = 'is-active';
          }

          newOptions += '<span class="uix-controls__select__option ' + selected + '" data-value="' + $(this).attr('value') + '">' + $(this).html() + '</span>';
        });
        $cusSelect.find(settings.itemsWrapper).html('<div>' + newOptions + '</div>'); //Set the default selector text

        $cusSelect.each(function (index) {
          $(this).find(settings.trigger).text($(this).find(settings.item + '.is-active').html());
        });
      });
    });
  };
})(jQuery);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* 
 *************************************
 * Count To
 *
 * @param  {Number} fixed              - formats a number using fixed-point notation.
 * @param  {Number} from                 - the number the element should start at
 * @param  {Number} number               - the number the element should end at
 * @param  {Number} duration             - how long it should take to count between the target numbers
 * @param  {Number} refreshInterval      - how often the element should be updated
 * @param  {Boolean} dilimiter           - the number of decimal places to show
 * @param  {Function} onUpdate           - callback method for every time the element is updated
 * @param  {Function} onComplete         - callback method for when the element finishes updating,
 * @param  {Boolean} doubleDigits        - two digits are used by default
 * @return {Void}
 *
 *************************************
 */
(function ($) {
  $.fn.UixCountTo = function (options) {
    options = options || {};
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.UixCountTo.defaults, {
        from: $(this).data('counter-start'),
        to: $(this).data('counter-number'),
        fixed: $(this).data('counter-fixed'),
        speed: $(this).data('counter-duration'),
        refreshInterval: $(this).data('counter-refresh-interval'),
        dilimiter: $(this).data('counter-dilimiter'),
        doubleDigits: $(this).data('counter-double-digits')
      }, options); // how many times to update the value, and how much to increment the value on each update

      var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops; // references & variables that will change with each update

      var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data('count-to') || {};
      $self.data('count-to', data); // if an existing interval can be found, clear it first

      if (data.interval) {
        clearInterval(data.interval);
      }

      data.interval = setInterval(updateTimer, settings.refreshInterval); // initialize the element with the starting value

      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;
        render(value);

        if (typeof settings.onUpdate == 'function') {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('count-to');
          clearInterval(data.interval);
          value = settings.to;

          if (typeof settings.onComplete == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = Number(value).toFixed(settings.fixed);

        if (settings.dilimiter && formattedValue > 0) {
          formattedValue = formattedValue.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
        }

        if (settings.doubleDigits) {
          if (formattedValue < 10) {
            formattedValue = '0' + formattedValue;
          }
        }

        $self.html(formattedValue);
      }
    });
  };

  $.fn.UixCountTo.defaults = {
    fixed: 0,
    // formats a number using fixed-point notation.
    from: 0,
    // the number the element should start at
    number: 0,
    // the number the element should end at
    duration: 500,
    // how long it should take to count between the target numbers
    refreshInterval: 1,
    // how often the element should be updated
    dilimiter: true,
    // the number of decimal places to show
    onUpdate: null,
    // callback method for every time the element is updated
    onComplete: null,
    // callback method for when the element finishes updating,
    doubleDigits: false // two digits are used by default

  };
})(jQuery);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Shows the next form.
 *
 * @param  {Element} selector        - Each target forms selector.
 * @param  {Element} formTarget      - Wrapper of target forms selector.
 * @param  {String} indicator       - Indicator of timeline.
 * @param  {Number} index           - Default index for initialization.
 * 									  0 => step one, 
 * 									  1 => step two
 * 									  2 => step three
 * 									  3 => step four
 * 									  4 => step five
 * 									  ...
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixFormProgressToNext = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      selector: $('.uix-form-progress__target .uix-form-progress__target__step'),
      formTarget: $('.uix-form-progress__target'),
      indicator: '.uix-form-progress .uix-form-progress__indicator',
      index: 0
    }, options);
    this.each(function () {
      var $this = $(this);
      var transitionEnd = 'webkitTransitionEnd transitionend',
          $sections = settings.selector,
          $formTarget = settings.formTarget,
          $indicator = $(settings.indicator),
          allStep = $indicator.length,
          stepPerValue = 100 / (allStep - 1);
      var value = 0,
          tarIndex,
          curIndex;
      if ($indicator.length == 0) return false; //Returns current index

      if (settings.index > allStep - 1) {
        curIndex = allStep - 1;
      } else {
        curIndex = settings.index;
      }

      tarIndex = curIndex - 1; // Returns current index

      if (tarIndex > allStep - 2) {
        value = stepPerValue * (allStep - 2);
        curIndex = allStep - 2;
      } else {
        curIndex = tarIndex;
      } // Increment value (based on 4 steps 0 - 100)


      value = stepPerValue * curIndex; //Get form transition speed

      var dur = $formTarget.data('anime-speed');

      if (_typeof(dur) === ( true ? "undefined" : undefined)) {
        dur = '0.5s';
      }

      var durString = dur.toLowerCase(),
          isMS = durString.indexOf('ms') >= 0,
          numberNum = durString.replace('ms', '').replace('s', ''),
          animeSpeed = isMS ? numberNum : numberNum * 1000;
      var currentFormStep = parseInt($sections.eq(tarIndex).attr('data-step')) || false,
          $nextForm = $formTarget.find('.uix-form-progress__target__step[data-step="' + (currentFormStep + 1) + '"]');
      var currentFormIndex = $nextForm.attr('data-step') - 1;
      if (isNaN(currentFormIndex)) currentFormIndex = 0; // Activate other unused modules

      if (currentFormIndex > 0) {
        for (var i = 0; i < curIndex; i++) {
          $sections.eq(i).addClass('leaving');
          $indicator.eq(i).addClass('is-active');
        }

        $indicator.eq(curIndex).addClass('is-active');
      } // Hide current form fields


      $sections.eq(tarIndex).addClass('leaving');
      setTimeout(function () {
        $indicator.eq(currentFormIndex).addClass('is-active');
      }, animeSpeed); // Show next form fields

      $nextForm.addClass('coming').one(transitionEnd, function () {
        $nextForm.removeClass('coming waiting');
      }); // Active next form fields

      $sections.removeClass('is-active');
      $sections.eq(currentFormIndex).addClass('is-active'); // Increment value (based on 4 steps 0 - 100)

      value += stepPerValue; //console.log( currentFormIndex );
      //Initialize pointer and form location data

      if (currentFormIndex == 0) {
        //Avoid initialization to always cover other same events
        $('body').addClass('form-progress-initok'); //so something

        $indicator.removeClass('is-active');
        $indicator.each(function (index) {
          $(this).css('left', index * stepPerValue + '%');
          $formTarget.find('.uix-form-progress__target__step:eq(' + index + ')').attr('data-step', index + 1);
        });
        setTimeout(function () {
          $formTarget.addClass('js-uix-show');
        }, animeSpeed);
        $formTarget.find('.uix-form-progress__target__step').removeClass('left leaving').css({
          'position': 'absolute'
        }).not(':eq(0)').addClass('waiting');
      } //Set wrapper height


      var currentContentH = $formTarget.find('.uix-form-progress__target__step:eq(' + currentFormIndex + ') > .uix-form-progress__content').height() + 100;
      $formTarget.css('height', currentContentH + 'px');
      var curText = $('.uix-form-progress .uix-form-progress__indicator:eq(' + currentFormIndex + ') > span').html();
      $('#app-form-progress-text').text(curText); //The current indicator class

      $indicator.removeClass('current');
      $indicator.eq(currentFormIndex).addClass('current'); // Reset if we've reached the end

      if (value >= 100) {
        $formTarget.find('.uix-form-progress__target__step').addClass('leaving').last().removeClass('coming waiting leaving');
      } else {
        $('.uix-form-progress').find('.uix-form-progress__indicator.is-active').next('.uix-form-progress__indicator').addClass('is-active');
      } // Set progress bar value


      $('.uix-form-progress .uix-form-progress__line span').css('width', value + '%');
      return false;
    });
  };
})(jQuery);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Render Normal Radio Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderNormalRadio = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls__radio'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        $(this).find('> label').each(function () {
          var targetID = '#' + $(this).parent().attr("data-targetid");
          var switchIDs = ''; //add switch IDs

          $(this).parent().find('> label').each(function () {
            if (_typeof($(this).data("switchid")) != ( true ? "undefined" : undefined)) {
              switchIDs += $(this).data("switchid") + ',';
            }
          });
          $(this).parent().attr("data-switchids", switchIDs.replace(/,\s*$/, '')); //Set actived style from their values

          if (_typeof($(this).data('value')) != ( true ? "undefined" : undefined)) {
            if ($(targetID).val() == $(this).data('value')) {
              $(this).addClass('is-active').find('[type="radio"]').prop('checked', true);
            } else {
              $(this).removeClass('is-active').find('[type="radio"]').prop('checked', false);
            }
          }
        });
      });
    });
  };
})(jQuery);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Render Date Picker
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderDatePicker = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '[data-picker]'
    }, options);
    this.each(function () {
      if ($.isFunction($.fn.datetimepicker)) {
        $(settings.controls).each(function () {
          var $this = $(this);
          var dateFormat = $this.data('picker-format'),
              timeEnable = $this.data('picker-timepicker'),
              lang = $this.data('picker-lang'),
              myminDate = $this.data('picker-min-date'),
              mymaxDate = $this.data('picker-max-date'),
              rtlEnable = false; // If there is no data-xxx, save current source to it

          if (_typeof(dateFormat) === ( true ? "undefined" : undefined)) dateFormat = 'M d, Y'; //Y-m-d H:i:s

          if (_typeof(timeEnable) === ( true ? "undefined" : undefined)) timeEnable = false;
          if (_typeof(lang) === ( true ? "undefined" : undefined)) lang = 'en';
          if (_typeof(myminDate) === ( true ? "undefined" : undefined)) myminDate = false; //yesterday is minimum date(for today use 0 or -1970/01/01)

          if (_typeof(mymaxDate) === ( true ? "undefined" : undefined)) mymaxDate = false; //tomorrow is maximum date calendar, such as '+2050/01/01'

          if (_typeof(rtlEnable) === ( true ? "undefined" : undefined)) rtlEnable = false;
          $.datetimepicker.setLocale(lang); //RTL 

          if ($('body').hasClass('rtl')) {
            rtlEnable = true;
          } //hide or display time selector


          if (timeEnable) {
            $(document).on('mouseenter', 'td.xdsoft_date[data-date]', function () {
              if ($(this).hasClass('xdsoft_disabled')) {
                $(this).closest('.xdsoft_datepicker').next('.xdsoft_timepicker.active').hide();
              } else {
                $(this).closest('.xdsoft_datepicker').next('.xdsoft_timepicker.active').show();
              }
            });
          }

          $this.datetimepicker({
            rtl: rtlEnable,
            timepicker: timeEnable,
            format: dateFormat,
            formatTime: 'H:i',
            formatDate: 'Y/m/d',
            minDate: myminDate,
            maxDate: mymaxDate
          });
        }); //Dynamic listening for the latest value

        $(document).on('mouseleave', '[data-handler]', function () {
          $('[data-picker]').each(function () {
            $(this).closest('div').find('label, .uix-controls__bar').addClass('is-active');
          });
        });
      } // function datetimepicker is exist

    });
  };
})(jQuery);

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/*
 * Hover Effect
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderControlsHover = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.js-uix-float-label'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        var $this = $(this); // on focus add cladd active to label

        $this.on('focus', function () {
          $(this).closest('div').find('label, .uix-controls__bar').addClass('is-active');
        }); //on blur check field and remove class if needed

        $this.on('blur change', function (e) {
          if ($this.val() === '' || $this.val() === 'blank') {
            $(this).closest('div').find('label').removeClass('is-active');
          } //----


          if ($this.val() === '' || $this.val() === 'blank' || $this.val() != '' && $this.val() != 'blank') {
            $(this).closest('div').find('.uix-controls__bar').removeClass('is-active');
          }
        }); // if exist cookie value

        if ($this.val() != '' && $this.val() != 'blank') {
          $(this).closest('div').find('label').addClass('is-active');
        }
      });
    });
  };
})(jQuery);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Render Single Selector Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderCustomSingleSel = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls__single-sel'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        $(this).find('> span').each(function () {
          var targetID = '#' + $(this).parent().attr('data-targetid');
          var switchIDs = ''; //add switch IDs

          $(this).parent().find('> span').each(function () {
            if (_typeof($(this).data("switchid")) != ( true ? "undefined" : undefined)) {
              switchIDs += $(this).data("switchid") + ',';
            }
          });
          $(this).parent().attr("data-switchids", switchIDs.replace(/,\s*$/, '')); //Set actived style from their values

          if ($(targetID).val() == $(this).data('value')) {
            $(this).addClass('is-active').attr('aria-checked', true);
          } else {
            $(this).removeClass('is-active').attr('aria-checked', false);
          }
        });
      });
    });
  };
})(jQuery);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/*
 * Render Multiple Selector Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderCustomMultiSel = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls__multi-sel'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        $(this).find('> span').each(function () {
          var targetID = '#' + $(this).parent().attr('data-targetid');

          if ($(targetID).val().indexOf($(this).data('value')) >= 0) {
            $(this).addClass('is-active').attr('aria-checked', true);
          } else {
            $(this).removeClass('is-active').attr('aria-checked', false);
          }
        });
      });
    });
  };
})(jQuery);

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/*
 * Render Custom File Dropzone
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderCustomFileDropzone = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls__file-field-container'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        var $dropZone = $(this).find('input[type="file"]');
        $(document).on('dragover', function (e) {
          var timeout = window.dropZoneTimeout;

          if (!timeout) {
            $dropZone.addClass('in');
          } else {
            clearTimeout(timeout);
          }

          var found = false,
              node = e.target;

          do {
            if (node === $dropZone[0]) {
              found = true;
              break;
            }

            node = node.parentNode;
          } while (node != null);

          if (found) {
            $dropZone.addClass('hover');
          } else {
            $dropZone.removeClass('hover');
          }

          window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            $dropZone.removeClass('in hover');
          }, 100);
        });
        $dropZone.on('change', function (e) {
          var input = $(this)[0];

          if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
              var imgData = e.target.result;
              var imgName = input.files[0].name;
              input.setAttribute('data-title', imgName); //console.log(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
          }
        });
      });
    });
  };
})(jQuery);

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/*
 * Render Custom File Type
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderCustomFile = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls__file-container'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        var $fileInput = $(this).find('input[type="file"]'),
            $fileBtn = $(this).find('.uix-controls__file-trigger'),
            $filePath = $(this).next('.uix-controls__file-return');
        $fileBtn.off('click').on('click', function () {
          $fileInput.focusin();
        });
        $fileInput.on('change', function () {
          $filePath.text($(this).val());
        });
      });
    });
  };
})(jQuery);

/***/ }),
/* 31 */
/***/ (function(module, exports) {

/*
 * Disabled Controls Status
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderControlsDisable = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: 'input.is-disabled'
    }, options);
    this.each(function () {
      $(settings.controls).prop('disabled', true);
    });
  };
})(jQuery);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Create Line Effect on Click
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderControlsLineEff = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls.uix-controls--line'
    }, options);
    this.each(function () {
      var $this = $(this);
      var customControls = settings.controls;
      $(customControls).each(function () {
        var dataExist = $(this).data('exist');

        if (_typeof(dataExist) === ( true ? "undefined" : undefined) && dataExist != 1) {
          $('<ins class="uix-controls__bar"></ins><ins class="uix-controls__basic-bar"></ins>').insertAfter($(this).find('label')); //Multiple Selector or Single Selector

          if ($(this).hasClass('uix-controls__multi-sel') || $(this).hasClass('uix-controls__single-sel')) {
            $(this).find('> span').each(function () {
              $(this).prepend('<ins class="uix-controls__bar"></ins><ins class="uix-controls__basic-bar"></ins>');
            });
          } //Custom Input Number


          if ($(this).hasClass('uix-controls__number')) {
            $(this).prepend('<ins class="uix-controls__bar"></ins><ins class="uix-controls__basic-bar"></ins>');
          } //Prevent the form from being initialized again


          $(this).data('exist', 1);
        }
      });
    });
  };
})(jQuery);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Render Custom Radio, Checkbox and Toggle 
 *
 * @param  {String} radioWrapper             - Wrapper of the radio.
 * @param  {String} toggle                   - Toggle of the checkbox.
 * @param  {String} checkboxWrapper          - Wrapper of the checkbox.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderCustomRadioCheckbox = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      radioWrapper: '.uix-controls__radio',
      toggle: '.uix-controls__toggle',
      checkboxWrapper: '.uix-controls__checkbox'
    }, options);
    this.each(function () {
      var $this = $(this);
      var customRadio = settings.radioWrapper,
          customToggle = settings.toggle,
          customCheckbox = settings.checkboxWrapper;
      $(customRadio).find('input[type="radio"]').each(function () {
        var dataExist = $(this).data('exist');

        if (_typeof(dataExist) === ( true ? "undefined" : undefined) && dataExist != 1) {
          $('<span class="uix-controls__radio-trigger"></span>').insertAfter($(this)); //Prevent the form from being initialized again

          $(this).data('exist', 1);
        }
      });
      $(customToggle).find('input[type="checkbox"]').each(function () {
        var dataExist = $(this).data('exist'),
            $obj = $(this).closest('.uix-controls'),
            offText = $obj.data('off-text'),
            onText = $obj.data('on-text');

        if (_typeof(dataExist) === ( true ? "undefined" : undefined) && dataExist != 1) {
          $('<span class="uix-controls__toggle-trigger" data-off-text="' + offText + '" data-on-text="' + onText + '"></span>').insertAfter($(this)); //hide or display a associated div

          var targetID = '#' + $obj.attr('data-targetid');

          if ($(this).is(':checked')) {
            $obj.addClass('is-active').attr('aria-checked', true);
            $(targetID).show();
          } else {
            $obj.removeClass('is-active').attr('aria-checked', false);
            $(targetID).hide();
          } //Prevent the form from being initialized again


          $(this).data('exist', 1);
        }
      });
      $(customCheckbox).find('input[type="checkbox"]').each(function () {
        var dataExist = $(this).data('exist'),
            $obj = $(this).closest('.uix-controls');

        if (_typeof(dataExist) === ( true ? "undefined" : undefined) && dataExist != 1) {
          $('<span class="uix-controls__checkbox-trigger"></span>').insertAfter($(this)); //hide or display a associated div

          var targetID = '#' + $obj.attr('data-targetid');

          if ($(this).is(':checked')) {
            $obj.addClass('is-active').attr('aria-checked', true);
            $(targetID).show();
          } else {
            $obj.removeClass('is-active').attr('aria-checked', false);
            $(targetID).hide();
          } //Prevent the form from being initialized again


          $(this).data('exist', 1);
        }
      });
    });
  };
})(jQuery);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Fire Modal Dialog
 *
 * @param  {String} id                   - Modal's unique identifier.
 * @param  {Number|Boolean} height       - Custom modal height whick need a unit string. 
										   This attribute "data-modal-height" may not exist. Such as: 200px
 * @param  {Number|Boolean} width        - Custom modal width whick need a unit string. 
										   This attribute "data-modal-height" may not exist. Such as: 200px
 * @param  {Number} speed                - Delay Time when Full Screen Effect is fired.   
 * @param  {?Element|Boolean} btn          - Link or button that fires an event.
 * @param  {Boolean} lightbox            - Whether to enable the lightbox effect.
 * @param  {Number|Boolean} autoClose    - Specify auto-close time. This function is not enabled when this value is false.
 * @param  {Boolean} closeOnlyBtn        - Disable mask to close the window.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixFireModalDialog = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      id: 'demo',
      height: false,
      width: false,
      speed: 500,
      btn: false,
      lightbox: true,
      autoClose: false,
      closeOnlyBtn: false
    }, options);
    this.each(function () {
      if (settings.id == '') return false; //Add modal mask to stage

      if ($('.uix-modal-mask').length == 0) {
        $('body').prepend('<div class="uix-modal-mask"></div>');
      }

      $.when($('.uix-modal-mask').length > 0).then(function () {
        if (settings.closeOnlyBtn) {
          $('.uix-modal-mask').addClass('js-uix-disabled');
        } else {
          $('.uix-modal-mask').removeClass('js-uix-disabled');
        }

        var dataID = settings.id,
            dataH = settings.height,
            dataW = settings.width,
            linkBtn = settings.btn,
            closeTime = settings.autoClose,
            $obj = $('.uix-modal-box#' + dataID); // Initializate modal

        if (linkBtn) {
          linkBtn.attr('href', 'javascript:void(0)');
          $obj.find('.uix-modal-box__content').addClass('js-uix-no-fullscreen');

          if (linkBtn.data('video-win')) {
            $obj.find('.uix-modal-box__content > .uix-modal-box__body').css('overflow-y', 'hidden');
          }
        }

        if ($obj.length > 0) {
          // Locks the page
          $.scrollLock(true);

          if (_typeof(dataH) != ( true ? "undefined" : undefined) && dataH != '' && dataH) {
            $obj.css({
              'height': dataH
            });
          }

          if (_typeof(dataW) != ( true ? "undefined" : undefined) && dataW != '' && dataW) {
            $obj.css({
              'width': dataW
            });
          } //Enable the lightbox effect.


          if (settings.lightbox) {
            TweenMax.set('.uix-modal-mask', {
              css: {
                opacity: 0,
                display: 'none'
              },
              onComplete: function onComplete() {
                TweenMax.to(this.target, 0.3, {
                  css: {
                    opacity: 1,
                    display: 'block'
                  }
                });
              }
            });
          }

          $obj.addClass('is-active'); //auto close

          if (closeTime && !isNaN(closeTime)) {
            window.setCloseModalDialog = setTimeout(function () {
              $(document).closeModalDialog();
            }, closeTime);
          }
        }

        if ($obj.hasClass('is-fullscreen')) {
          setTimeout(function () {
            if (!$obj.hasClass('is-video')) {
              $obj.find('.uix-modal-box__content > .uix-modal-box__body').css('overflow-y', 'scroll');
            } else {
              $obj.find('.uix-modal-box__content > .uix-modal-box__body').css('overflow-y', 'hidden');
            }
          }, settings.speed);
        }
      });
    });
  };
})(jQuery);

/***/ }),
/* 48 */
/***/ (function(module, exports) {

/*
 * Close Modal Dialog
 *
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixCloseModalDialog = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      target: '.uix-modal-box'
    }, options);
    this.each(function () {
      //Enable mask to close the window.
      $('.uix-modal-mask').removeClass('js-uix-disabled');
      $(settings.target).removeClass('is-active');
      TweenMax.to('.uix-modal-mask', 0.3, {
        css: {
          opacity: 0,
          display: 'none'
        }
      });
      $(settings.target).find('.uix-modal-box__content').removeClass('js-uix-no-fullscreen'); // Unlocks the page

      $.scrollLock(false); //Prevent automatic close from affecting new fire effects

      clearTimeout(window.setCloseModalDialog);
    });
  };
})(jQuery);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 63 */
/***/ (function(module, exports) {

/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = function () {
  var sort = [].sort;
  return function (comparator, getSortable) {
    getSortable = getSortable || function () {
      return this;
    };

    var placements = this.map(function () {
      var sortElement = getSortable.call(this),
          parentNode = sortElement.parentNode,
          // Since the element itself will change position, we have
      // to have some way of storing it's original position in
      // the DOM. The easiest way is to have a 'flag' node:
      nextSibling = parentNode.insertBefore(document.createTextNode(''), sortElement.nextSibling);
      return function () {
        if (parentNode === this) {
          throw new Error("You can't sort elements if any one is a descendant of another.");
        } // Insert before flag:


        parentNode.insertBefore(this, nextSibling); // Remove flag:

        parentNode.removeChild(nextSibling);
      };
    });
    return sort.call(this, comparator).each(function (i) {
      placements[i].call(getSortable.call(this));
    });
  };
}();

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Text Animation
 *
 * @param  {String} selectors                - Text wrapper ID or class name.
 * @return {Void}
 */
(function ($) {
  $.fn.UixTextEff = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      selectors: '.letters-eff-fadeInRight',
      scrollSpy: false
    }, options);
    this.each(function () {
      var customControls = settings.selectors;
      var scrollSpy = settings.scrollSpy;
      var $this = $(customControls);
      var speed = $this.data('text-eff-speed'),
          txtEff;

      if (_typeof(speed) === ( true ? "undefined" : undefined)) {
        speed = 1200;
      } //The data-text-eff attribute must be unique, otherwise it will not execute correctly.


      if ($this.length > 1) return false;
      $this.html($this.text().replace(/([^\x00-\x80]|\w|((?=[\x21-\x7e]+)[^A-Za-z0-9]))/g, "<span class='uix-letter'>$&</span>")); //--------------

      if (customControls.indexOf('fadeInRight') >= 0) {
        txtEff = anime.timeline({
          loop: false
        }).add({
          targets: customControls + ' .uix-letter',
          translateX: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: speed,
          delay: function delay(el, i) {
            return 500 + 30 * i;
          }
        });
      } //--------------


      if (customControls.indexOf('zoomInDown') >= 0) {
        txtEff = anime.timeline({
          loop: false
        }).add({
          targets: customControls + ' .uix-letter',
          scale: [0, 1],
          duration: speed,
          elasticity: 600,
          delay: function delay(el, i) {
            return 45 * (i + 1);
          }
        });
      } //--------------


      if (customControls.indexOf('flyInOut') >= 0) {
        txtEff = anime.timeline({
          loop: false
        }).add({
          targets: customControls + ' .uix-letter',
          translateX: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: speed,
          delay: function delay(el, i) {
            return 500 + 30 * i;
          }
        });
      } //--------------


      if (customControls.indexOf('fading') >= 0) {
        txtEff = anime.timeline({
          loop: false
        }).add({
          targets: customControls + ' .uix-letter',
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: speed,
          delay: function delay(el, i) {
            return 150 * (i + 1);
          }
        });
      } //--------------


      if (customControls.indexOf('floatingUp') >= 0) {
        txtEff = anime.timeline({
          loop: false
        }).add({
          targets: customControls + ' .uix-letter',
          translateY: ["1.1em", 0],
          translateZ: 0,
          duration: speed,
          delay: function delay(el, i) {
            return 50 * i;
          }
        });
      } //--------------


      if (customControls.indexOf('scaleIn') >= 0) {
        txtEff = anime.timeline({
          loop: false
        }).add({
          targets: customControls + ' .uix-letter',
          opacity: [0, 1],
          scale: [3.5, 1],
          duration: speed
        });
      }

      txtEff.pause();

      if (!scrollSpy) {
        txtEff.play();
      } else {
        var viewport = 1; //

        var scrollUpdate = function scrollUpdate() {
          var spyTop = $this[0].getBoundingClientRect().top; //Prevent asynchronous loading of repeated calls

          var actived = $this.data('activated');

          if (spyTop < window.innerHeight * viewport) {
            if (_typeof(actived) === ( true ? "undefined" : undefined)) {
              txtEff.play(); //Prevents front-end javascripts that are activated in the background to repeat loading.

              $this.data('activated', 1);
            } //endif actived

          }
        };

        scrollUpdate(); // Please do not use scroll's off method in each

        $(window).on('scroll.UixTextEff touchmove.UixTextEff', function (event) {
          scrollUpdate();
        });
      }
    });
  };
})(jQuery);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/components/ES5/_app-load.js
/*
 * Third-party plugins for website
 *    
 * !!! Third-party plugins adopt pure file merger and do not import and export
 * !!! Please do not modify variable "UIXKIT_3RD_PARTY_PLUGINS_IMPORT" name
 */
var UIXKIT_3RD_PARTY_PLUGINS_IMPORT = {
  "files": [//Dependencies
  //Must be placed in the first place
  //---------------------
  "./src/components/ES5/_plugins-Miscellaneous/js/_dependencies.js", //Website ==> miscellaneous
  //---------------------
  "./src/components/ES5/_plugins-Miscellaneous/js/scrollLock.js", "./src/components/ES5/_plugins-Miscellaneous/js/attrExt.js", "./src/components/ES5/_plugins-Miscellaneous/js/hashchange.js", "./src/components/ES5/_plugins-Miscellaneous/js/datepicker.js", "./src/components/ES5/_plugins-Miscellaneous/js/jquery.flexslider.js", //GSAP plugins
  //---------------------
  "./src/components/ES5/_plugins-GSAP/js/ColorPropsPlugin.js", "./src/components/ES5/_plugins-GSAP/js/CSSRulePlugin.js", "./src/components/ES5/_plugins-GSAP/js/EaselPlugin.js", "./src/components/ES5/_plugins-GSAP/js/EndArrayPlugin.js", "./src/components/ES5/_plugins-GSAP/js/ModifiersPlugin.js", "./src/components/ES5/_plugins-GSAP/js/PixiPlugin.js", "./src/components/ES5/_plugins-GSAP/js/RaphaelPlugin.js", "./src/components/ES5/_plugins-GSAP/js/ScrollToPlugin.js", "./src/components/ES5/_plugins-GSAP/js/TEMPLATE_Plugin.js", "./src/components/ES5/_plugins-GSAP/js/TextPlugin.js", //three.js plugins
  //---------------------
  "./src/components/ES5/_plugins-THREE/js/renderers/CSS3DRenderer.js", "./src/components/ES5/_plugins-THREE/js/controls/OrbitControls.js", "./src/components/ES5/_plugins-THREE/js/shaders/CopyShader.js", "./src/components/ES5/_plugins-THREE/js/shaders/ConvolutionShader.js", "./src/components/ES5/_plugins-THREE/js/postprocessing/EffectComposer.js", "./src/components/ES5/_plugins-THREE/js/postprocessing/BloomPass.js", "./src/components/ES5/_plugins-THREE/js/postprocessing/MaskPass.js", "./src/components/ES5/_plugins-THREE/js/postprocessing/TexturePass.js", "./src/components/ES5/_plugins-THREE/js/postprocessing/ShaderPass.js", "./src/components/ES5/_plugins-THREE/js/postprocessing/RenderPass.js", "./src/components/ES5/_plugins-THREE/js/postprocessing/ClearPass.js", "./src/components/ES5/_plugins-THREE/js/modifiers/TessellateModifier.js", "./src/components/ES5/_plugins-THREE/js/modifiers/ExplodeModifier.js", "./src/components/ES5/_plugins-THREE/js/extensions/ShaderRuntime.custom.js", "./src/components/ES5/_plugins-THREE/js/extensions/d3-threeD.custom.js", "./src/components/ES5/_plugins-THREE/js/extensions/simplex-noise.js", "./src/components/ES5/_plugins-THREE/js/extensions/THREE.MeshLine.js", // loader
  //---------------------
  "./src/components/ES5/_plugins-THREE/js/loaders/OBJLoader.js", //Extra filter -- film
  //---------------------
  "./src/components/ES5/_plugins-THREE/js/shaders/FilmShader.js", "./src/components/ES5/_plugins-THREE/js/postprocessing/FilmPass.js"]
};

// EXTERNAL MODULE: ./src/components/ES6/_global/scss/_style.scss
var _style = __webpack_require__(4);

// CONCATENATED MODULE: ./src/components/ES6/_global/js/index.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**

	TABLE OF CONTENTS
	---------------------------


	${{TOC}}

*/

/*
 *************************************
 * <!-- Base -->
 *************************************
 */

/*
 * Global variables from front pages
 *
 * @private
 */

var //If the file is in the root directory, you can leave it empty.
//If in another directory, you can write: "/blog"
templateUrl, //Eg. https://uiux.cc
homeUrl, //Eg. https://uiux.cc/wp-admin/admin-ajax.php
ajaxUrl;

if (typeof APP_ROOTPATH === 'undefined') {
  templateUrl = '';
  homeUrl = '';
  ajaxUrl = '';
} else {
  templateUrl = APP_ROOTPATH.templateUrl.replace(/\/\s*$/, '');
  homeUrl = APP_ROOTPATH.homeUrl.replace(/\/\s*$/, '');
  ajaxUrl = APP_ROOTPATH.ajaxUrl.replace(/\/\s*$/, '');
}
/*
 * Determine whether it is a special browser
 *
 * @private
 */
// Add feature test for passive event listener support


var supportsPassive = false;

try {
  document.addEventListener("test", null, {
    get passive() {
      supportsPassive = true;
    }

  });
} catch (e) {}

var browser = {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isAndroid: /(android)/i.test(navigator.userAgent),
  isPC: !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
  isSafari: !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),

  /*Test to 9, 10. */
  isIE: !!window.ActiveXObject || "ActiveXObject" in window,

  /*Test to 6 ~ 11 (not edge) */
  supportsPassive: supportsPassive
};
/*
 * Core scripts for current site
 *
 * @private
 * @description Used for all modules from ./src/components/ES6/[__]/js
 * @requires ./examples/assets/js/min/jquery.waitforimages.min.js
 * @requires ./examples/assets/js/min/video.min.js
 * @requires ./examples/assets/js/min/TweenMax.min.js
 */

var UixModuleInstance = function ($, window, document) {
  var _APP = {},
      components = {
    documentReady: [],
    pageLoaded: []
  };

  if ($('img').length == 0) {
    $('body').prepend('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="display:none">');
  }

  if ($.isFunction($.fn.waitForImages)) {
    $('body').waitForImages(pageLoaded);
  } else {
    $(window).on('load', pageLoaded);
  }

  $(document).ready(documentReady);

  function documentReady(context) {
    context = _typeof(context) == ( true ? "undefined" : undefined) ? $ : context;
    components.documentReady.forEach(function (component) {
      component(context);
    });
  }

  function pageLoaded(context) {
    context = _typeof(context) == "object" ? $ : context;
    components.pageLoaded.forEach(function (component) {
      component(context);
    });
  }

  _APP.setContext = function (contextSelector) {
    var context = $;

    if (_typeof(contextSelector) !== ( true ? "undefined" : undefined)) {
      return function (selector) {
        return $(contextSelector).find(selector);
      };
    }

    return context;
  };

  _APP.components = components;
  _APP.documentReady = documentReady;
  _APP.pageLoaded = pageLoaded;
  return _APP;
}($, window, document);
/*
 * Create GUID / UUID
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @return {String}                        - The globally-unique identifiers.
 */

var UixGUID = UixGUID || function () {
  function t() {}

  return t.version = "0.0.1", t.create = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }, //
  t;
}();
/*
 * Evaluating a string as a mathematical expression in JavaScript
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @return {String}            - New calculation result.
 */

var UixMath = UixMath || function () {
  function t() {}

  return t.version = "0.0.1", t.evaluate = function (s) {
    var chars = s.replace(/\s/g, '').split("");
    var n = [],
        op = [],
        index = 0,
        oplast = true;
    n[index] = ""; // Parse the expression

    for (var c = 0; c < chars.length; c++) {
      if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
        op[index] = chars[c];
        index++;
        n[index] = "";
        oplast = true;
      } else {
        n[index] += chars[c];
        oplast = false;
      }
    } // Calculate the expression


    s = parseFloat(n[0]);

    for (var o = 0; o < op.length; o++) {
      var num = parseFloat(n[o + 1]);

      switch (op[o]) {
        case "+":
          s = s + num;
          break;

        case "-":
          s = s - num;
          break;

        case "*":
          s = s * num;
          break;

        case "/":
          s = s / num;
          break;
      }
    }

    return s;
  }, //
  t;
}();
/*
 * Get the CSS property
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {!Element} el     - The Element for which to get the computed style. Using class name or ID to locate.
 * @return {String|Object}   - The value of property.
 */

var UixCssProperty = UixCssProperty || function () {
  function t() {}

  return t.version = "0.0.1", t.getTransitionDuration = function (el) {
    if (_typeof(el) === ( true ? "undefined" : undefined)) {
      return 0;
    }

    var style = window.getComputedStyle(el),
        duration = style.webkitTransitionDuration,
        delay = style.webkitTransitionDelay;

    if (_typeof(duration) != ( true ? "undefined" : undefined)) {
      // fix miliseconds vs seconds
      duration = duration.indexOf("ms") > -1 ? parseFloat(duration) : parseFloat(duration) * 1000;
      delay = delay.indexOf("ms") > -1 ? parseFloat(delay) : parseFloat(delay) * 1000;
      return duration;
    } else {
      return 0;
    }
  }, //
  t.getAbsoluteCoordinates = function (el) {
    var windowWidth = window.innerWidth,
        leftPos = null,
        topPos = null;

    if (!document.getElementsByTagName('body')[0].className.match(/rtl/)) {
      leftPos = el.offsetLeft == 0 ? el.parentElement.offsetLeft : el.offsetLeft;
      topPos = el.offsetTop == 0 ? el.parentElement.offsetTop : el.offsetTop;
    } else {
      // width and height in pixels, including padding and border
      // Corresponds to jQuery outerWidth(), outerHeight()
      leftPos = el.offsetLeft == 0 ? windowWidth - (el.parentElement.offsetLeft + el.parentElement.offsetWidth) : windowWidth - (el.offsetLeft + el.offsetWidth);
      topPos = el.offsetTop == 0 ? windowWidth - (el.parentElement.offsetTop + el.parentElement.offsetHeight) : windowWidth - (el.offsetTop + el.offsetHeight);
    }

    return {
      'left': leftPos,
      'top': topPos
    };
  }, //
  t;
}();
// CONCATENATED MODULE: ./src/components/ES6/_global/js/fn/UixModuleFilter.js
function UixModuleFilter_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { UixModuleFilter_typeof = function _typeof(obj) { return typeof obj; }; } else { UixModuleFilter_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return UixModuleFilter_typeof(obj); }

/*
 * Method of deleting or adding a module
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean|String} destroy       - If it is a string, it means destroying this module from UixModuleInstance
 * @param  {Object} add                     - New module data via JSON.
 * @param  {String} add.moduleName        - The name of the module (the default is all uppercase).
 * @param  {Boolean} add.pageLoaded       - Window loading module method. If true or 1, the module will execute after the page is loaded.
 * @param  {Number} add.version           - The new module version number.
 * @param  {Function} add.callback        - The new module script of function.
 * @return {Void}      
 *
 * @Usage:
 * !!! The code is to be inserted in front of the uix-kit core script.
	
	
<script>
window.MAIN = null;
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixModuleFilter( { 
		   'destroy' : 'MAIN',
		   'add'     : {
							moduleName    : 'YOUR_MODULE_NAME',
							pageLoaded    : true,
							version       : '0.0.1',
							callback      : function() {
								//the module will execute after the page is loaded.

							}
						}
		} );
    } );
} ) ( jQuery );
</script>

 *
 * 
 */


(function ($) {
  'use strict';

  $.fn.UixModuleFilter = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      destroy: false,
      add: {
        moduleName: 'OLD_MODULE_NAME',
        pageLoaded: false,
        version: '0.0.1',
        callback: function callback() {}
      }
    }, options);
    this.each(function () {
      //remove a module
      //-------------------------------------	
      if (settings.destroy && Object.prototype.toString.call(settings.destroy) == '[object String]') {
        var moduleName = settings.destroy;

        if (UixModuleFilter_typeof(UixModuleInstance[moduleName]) != ( true ? "undefined" : undefined)) {
          delete UixModuleInstance[moduleName];
        }
      } //add or replace a module
      //-------------------------------------	


      if (settings.add && Object.prototype.toString.call(settings.add) == '[object Object]' && settings.add.hasOwnProperty('pageLoaded')) {
        var _moduleName2 = settings.add.moduleName; //delete the old module if exist

        if (UixModuleFilter_typeof(UixModuleInstance[_moduleName2]) != ( true ? "undefined" : undefined)) {
          console.log('The module already exists, please destroy the old module or change the new module name.');
        } else {
          //loading mode "documentReady"
          if (!settings.add.pageLoaded || settings.add.pageLoaded == 0) {
            var _moduleName = function (module, $, window, document) {
              module[_moduleName2] = module[_moduleName2] || {};
              module[_moduleName2].version = settings.add.version;

              module[_moduleName2].documentReady = function ($) {
                settings.add.callback();
              };

              module.components.documentReady.push(module[_moduleName2].documentReady);
              return _moduleName;
            }(UixModuleInstance, jQuery, window, document);

            UixModuleInstance[_moduleName2].documentReady($);
          } //loading mode "pageLoaded"


          if (settings.add.pageLoaded || settings.add.pageLoaded == 1) {
            var _moduleName3 = function (module, $, window, document) {
              module[_moduleName2] = module[_moduleName2] || {};
              module[_moduleName2].version = settings.add.version;

              module[_moduleName2].pageLoaded = function () {
                settings.add.callback();
              };

              module.components.pageLoaded.push(module[_moduleName2].pageLoaded);
              return _moduleName3;
            }(UixModuleInstance, jQuery, window, document);

            UixModuleInstance[_moduleName2].pageLoaded();
          }
        }
      }
    });
  };
})(jQuery);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/fn/UixApplyAsyncScripts.js
/*
 * Apply some asynchronism scripts
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean} scrollReveal          - Run script of module "Scroll Reveal". a page commonly used to
 *                                           load asynchronous information
 * @param  {Boolean} ajaxPostList          - Run script of module "Posts List With Ajax". a page commonly used to
 *                                           load asynchronous information
 * @param  {Boolean} ajaxDDList            - Run script of module "Dynamic Drop Down List from JSON".
 * @param  {Boolean} counterAnim           - Run script of module "Counter".
 * @return {Void}
 *
 * @Usage:
    
	
<script>
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixApplyAsyncScripts({
			scrollReveal    : true,
			ajaxPostList    : true,
			ajaxDDList      : true,
			counterAnim     : true,
			lightBox        : true 
		});
    } );
} ) ( jQuery );
</script>

 

 *
 * 
 */


(function ($) {
  'use strict';

  $.fn.UixApplyAsyncScripts = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      scrollReveal: true,
      // @from ./src/components/ES6/scroll-reveal
      ajaxPostList: true,
      // @from ./src/components/ES6/list-posts
      ajaxDDList: true,
      // @from ./src/components/ES6/dynamic-dropdown-list-json
      counterAnim: true,
      // @from ./src/components/ES6/counter
      lightBox: true // @from ./src/components/ES6/lightbox

    }, options);
    this.each(function () {
      //----
      if (UixModuleInstance.MAIN) UixModuleInstance.MAIN.pageLoaded(); //Theme Scripts

      if (UixModuleInstance.COMMON_HEIGHT) UixModuleInstance.COMMON_HEIGHT.pageLoaded(); //Common Height

      if (UixModuleInstance.ADVANCED_SLIDER) UixModuleInstance.ADVANCED_SLIDER.pageLoaded(); //Advanced Slider (Basic)

      if (UixModuleInstance.ADVANCED_SLIDER_FILTER) UixModuleInstance.ADVANCED_SLIDER_FILTER.pageLoaded(); //Advanced Slider

      if (UixModuleInstance.FULL_WIDTH_COLUMN_TO_EDGE) UixModuleInstance.FULL_WIDTH_COLUMN_TO_EDGE.pageLoaded(); //Full Width Column to Edge

      if (UixModuleInstance.STICKY_EL) UixModuleInstance.STICKY_EL.pageLoaded(); //Sticky Elements

      if (UixModuleInstance.TEXT_EFFECT) UixModuleInstance.TEXT_EFFECT.pageLoaded(); //Text effect

      if (UixModuleInstance.TIMELINE) UixModuleInstance.TIMELINE.pageLoaded(); //Timeline
      //----

      if (UixModuleInstance.MAIN) UixModuleInstance.MAIN.documentReady($); //Theme Scripts

      if (UixModuleInstance.TABLE) UixModuleInstance.TABLE.documentReady($); //Responsive Table

      if (UixModuleInstance.TABLE_SORTER) UixModuleInstance.TABLE_SORTER.documentReady($); //Table Sorter

      if (UixModuleInstance.MODAL_DIALOG) UixModuleInstance.MODAL_DIALOG.documentReady($); //Modal Dialog

      if (UixModuleInstance.PARALLAX) UixModuleInstance.PARALLAX.documentReady($); //Parallax

      if (UixModuleInstance.VIDEOS) UixModuleInstance.VIDEOS.documentReady($); //Videos

      if (UixModuleInstance.BODY_AND_HEADER) UixModuleInstance.BODY_AND_HEADER.documentReady($); //Header Area

      if (UixModuleInstance.SET_BG) UixModuleInstance.SET_BG.documentReady($); //Specify a background image

      if (UixModuleInstance.GET_CUSTOM_ATTRS) UixModuleInstance.GET_CUSTOM_ATTRS.documentReady($); //Get all custom attributes of an element like "data-*"

      if (UixModuleInstance.PAGINATION) UixModuleInstance.PAGINATION.documentReady($); //Pagination

      if (UixModuleInstance.FORM) UixModuleInstance.FORM.documentReady($); //Form

      if (UixModuleInstance.FLEXSLIDER) UixModuleInstance.FLEXSLIDER.documentReady($); //Flexslider

      if (UixModuleInstance.RETINA) UixModuleInstance.RETINA.documentReady($); //Retina Graphics for Website

      if (UixModuleInstance.SHOW_MORELESS) UixModuleInstance.SHOW_MORELESS.documentReady($); //Show More Less

      if (UixModuleInstance.DROPDOWN_MENU) UixModuleInstance.DROPDOWN_MENU.documentReady($); //Dropdown Menu

      if (UixModuleInstance.DROPDOWN_MENU2) UixModuleInstance.DROPDOWN_MENU2.documentReady($); //Dropdown Menu2

      if (UixModuleInstance.ACCORDION) UixModuleInstance.ACCORDION.documentReady($); //Accordion

      if (UixModuleInstance.ADVANCED_CONTENT_SLIDER) UixModuleInstance.ADVANCED_CONTENT_SLIDER.documentReady($); //Advanced Content Slider

      if (UixModuleInstance.GALLERY) UixModuleInstance.GALLERY.documentReady($); //Gallery

      if (UixModuleInstance.IMAGE_SHAPES) UixModuleInstance.IMAGE_SHAPES.documentReady($); //Image Shapes

      if (UixModuleInstance.PERIODICAL_SCROLL) UixModuleInstance.PERIODICAL_SCROLL.documentReady($); //Periodical Scroll

      if (UixModuleInstance.PRICING) UixModuleInstance.PRICING.documentReady($); //Pricing

      if (UixModuleInstance.PROGRESS_BAR) UixModuleInstance.PROGRESS_BAR.documentReady($); //Progress Bar

      if (UixModuleInstance.PROGRESS_LINE) UixModuleInstance.PROGRESS_LINE.documentReady($); //Progress Line

      if (UixModuleInstance.ROTATING_EL) UixModuleInstance.ROTATING_EL.documentReady($); //Rotating Elements

      if (UixModuleInstance.SMOOTH_SCROLLING_ANCHORLINK) UixModuleInstance.SMOOTH_SCROLLING_ANCHORLINK.documentReady($); //Smooth Scrolling When Clicking An Anchor Link

      if (UixModuleInstance.TABS) UixModuleInstance.TABS.documentReady($); //Tabs

      if (UixModuleInstance.TEAM_FOCUS) UixModuleInstance.TEAM_FOCUS.documentReady($); //Team Focus

      if (UixModuleInstance.LAVA_LAMP_STYLE_MENU) UixModuleInstance.LAVA_LAMP_STYLE_MENU.documentReady($); //Lava-Lamp Style Menu

      if (UixModuleInstance.CIRCLE_LAYOUT) UixModuleInstance.CIRCLE_LAYOUT.documentReady($); //Circle Layout

      if (UixModuleInstance.MULTI_ITEMS_CAROUSEL) UixModuleInstance.MULTI_ITEMS_CAROUSEL.documentReady($); //Multiple Items Carousel

      if (UixModuleInstance.THREE_BACKGROUND) UixModuleInstance.THREE_BACKGROUND.documentReady($); //3D Background

      if (UixModuleInstance.THREE_CAROUSEL) UixModuleInstance.THREE_CAROUSEL.documentReady($); //3D Carousel

      if (UixModuleInstance.THREE_LIQUID_SCROLLSPY_SLIDER) UixModuleInstance.THREE_LIQUID_SCROLLSPY_SLIDER.documentReady($); //3D Liquid Scrollspy Slider
      //---- Prevent overlay clicks on asynchronous requests
      //---- Commonly used for AJAX modules that are clicked by button
      //Scroll Reveal

      if (settings.scrollReveal) {
        if (UixModuleInstance.SCROLL_REVEAL) UixModuleInstance.SCROLL_REVEAL.documentReady($);
      } //Posts List With Ajax


      if (settings.ajaxPostList) {
        if (UixModuleInstance.POST_LIST_AJAX) UixModuleInstance.POST_LIST_AJAX.documentReady($);
      } //Dynamic Drop Down List from JSON


      if (settings.ajaxDDList) {
        if (UixModuleInstance.DYNAMIC_DD_LIST) UixModuleInstance.DYNAMIC_DD_LIST.documentReady($);
      } //Counter


      if (settings.counterAnim) {
        if (UixModuleInstance.COUNTER) UixModuleInstance.COUNTER.documentReady($);
      } //Custom Lightbox


      if (settings.lightBox) {
        if (UixModuleInstance.LIGHTBOX) UixModuleInstance.LIGHTBOX.pageLoaded();
      } //----Uix Shortcodes (WordPress Plugin)


      if ($.isFunction($.uix_sc_init)) {
        $.uix_sc_init();
      }
    });
  };
})(jQuery);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/fn/UixApplyAsyncAllScripts.js
/*
 * Apply all the asynchronism scripts
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean} runAll          - Run all module scripts.
 * @return {Void}
 *
 * @Usage:
    
<script>
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixApplyAsyncAllScripts();
    } );
} ) ( jQuery );
</script>
	

 *
 * 
 */


(function ($) {
  'use strict';

  $.fn.UixApplyAsyncAllScripts = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      runAll: true
    }, options);
    this.each(function () {
      var scipts_pageLoaded = UixModuleInstance.components.pageLoaded,
          scipts_documentReady = UixModuleInstance.components.documentReady;

      if (settings.runAll) {
        for (var i = 0; i < scipts_pageLoaded.length; i++) {
          scipts_pageLoaded[i]();
        }

        for (var j = 0; j < scipts_documentReady.length; j++) {
          scipts_documentReady[j]($);
        }
      } //Uix Shortcodes


      if ($.isFunction($.uix_sc_init)) {
        $.uix_sc_init();
      }
    });
  };
})(jQuery);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/body-and-header.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Body And Header -->
 *************************************
 */

var BODY_AND_HEADER = function (module, $, window, document) {
  if (window.BODY_AND_HEADER === null) return false;
  module.BODY_AND_HEADER = module.BODY_AND_HEADER || {};
  module.BODY_AND_HEADER.version = '0.0.7';

  module.BODY_AND_HEADER.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('body').hasClass('onepage')) return false;
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //-------- Header initialize

    headerInit(windowWidth);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth; // Do stuff here

        headerInit(windowWidth);
      }
    });

    function headerInit(w) {
      var $headerPlaceholder = $('.uix-header__placeholder.js-uix-header__placeholder-autoheight');

      if (w > 768) {
        $headerPlaceholder.css('height', $('.uix-header__container').outerHeight(true) + 'px');
        $('body').removeClass('is-mobile');
      } else {
        $headerPlaceholder.css('height', 0);
        $('body').addClass('is-mobile');
      }
    } //-------- Sticky header area
    //Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element


    var $el = $('.uix-header__container, .uix-header__placeholder');
    $window.off('scroll.BODY_AND_HEADER touchmove.BODY_AND_HEADER').on('scroll.BODY_AND_HEADER touchmove.BODY_AND_HEADER', function () {
      var scrolled = $(this).scrollTop(),
          spyTop = 220;

      if (scrolled >= spyTop) {
        $el.addClass('is-fixed');
      } else {
        $el.removeClass('is-fixed');
      }
    });
  };

  module.components.documentReady.push(module.BODY_AND_HEADER.documentReady);
  return function BODY_AND_HEADER() {
    _classCallCheck(this, BODY_AND_HEADER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/common-height.js
function common_height_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Common Height -->
 
 *
 * Note: 
 *
 * Automatically sets the div height of the grid system to the height of the 
 * outer container when ".js-uix-common-height" class on ".row" or ".uix-core-grid__row" div.
 *
 *************************************
 */

var COMMON_HEIGHT = function (module, $, window, document) {
  if (window.COMMON_HEIGHT === null) return false;
  module.COMMON_HEIGHT = module.COMMON_HEIGHT || {};
  module.COMMON_HEIGHT.version = '0.0.3';

  module.COMMON_HEIGHT.pageLoaded = function () {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    commonHeightInit(windowWidth);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth; // Do stuff here

        commonHeightInit(windowWidth);
      }
    });

    function commonHeightInit(w) {
      $('.js-uix-common-height').each(function () {
        var $this = $(this);
        var element = $this;
        var selectors = '[class*=col-], [class*=uix-core-grid__col-]'; //Bootstrap grid system and Custom uix grid system

        var maxHeight = 0; // Select and loop the elements you want to equalise

        element.children(selectors).each(function () {
          var element = $(this); //Solve the problem that the image cannot be read accurately

          element.find('img').each(function () {
            var imgOuter = $(this).parent('a').css('display');

            if (imgOuter == 'inline') {
              $(this).parent('a').css('display', 'inline-block');
            }
          });

          if (element.hasClass('max-height')) {
            // if has max-height
            maxHeight = element.outerHeight();
          } else {
            // if this box is higher than the cached highest then store it
            if (element.height() > maxHeight) {
              maxHeight = element.outerHeight();
            }
          }
        }); // Set the height of all those children to whichever was highest 

        if (w > 768) {
          element.children(selectors).each(function () {
            $(this).css('height', maxHeight);
          });
        } else {
          element.children(selectors).each(function () {
            $(this).css('height', 'auto');
          });
        }
      });
    }
  };

  module.components.pageLoaded.push(module.COMMON_HEIGHT.pageLoaded);
  return function COMMON_HEIGHT() {
    common_height_classCallCheck(this, COMMON_HEIGHT);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/custom-data-attrs.js
function custom_data_attrs_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Get all custom attributes of an element like "data-*" -->
 *************************************
 */

/**
 * module.GET_CUSTOM_ATTRS
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */

var GET_CUSTOM_ATTRS = function (module, $, window, document) {
  if (window.GET_CUSTOM_ATTRS === null) return false;
  module.GET_CUSTOM_ATTRS = module.GET_CUSTOM_ATTRS || {};
  module.GET_CUSTOM_ATTRS.version = '0.0.1';

  module.GET_CUSTOM_ATTRS.documentReady = function ($) {
    $('[data-my-custom-datas]').each(function () {
      var $this = $(this); //Get all attributes of an element and push the new attributes like "data-*"

      var curAttrs = $this.attr(),
          customPostData = '';
      $.each(curAttrs, function (i, val) {
        if (i.indexOf('data-custom-field-') >= 0) {
          customPostData += '"' + i.replace('data-custom-field-', '') + '": ' + '"' + val + '", ';
        }
      });
      customPostData = customPostData.replace(/,\s*$/, '');
    });
  };

  module.components.documentReady.push(module.GET_CUSTOM_ATTRS.documentReady);
  return function GET_CUSTOM_ATTRS() {
    custom_data_attrs_classCallCheck(this, GET_CUSTOM_ATTRS);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/loader.js
function loader_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function loader_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { loader_typeof = function _typeof(obj) { return typeof obj; }; } else { loader_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return loader_typeof(obj); }

/* 
 *************************************
 * <!-- Loader -->
 *************************************
 */

var LOADER = function (module, $, window, document) {
  if (window.LOADER === null) return false;
  module.LOADER = module.LOADER || {};
  module.LOADER.version = '0.0.4';

  module.LOADER.documentReady = function ($) {
    // Disable devices scaling
    //-------------------------------------	
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      var now = new Date().getTime();

      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }

      lastTouchEnd = now;
    }, false); // Loader Process
    //-------------------------------------	
    // Detect if video.load is successful or not 

    var videos = [];
    var videosTotal = 0;
    var videosLoaded = 0;
    $('.uix-video__slider > video').each(function () {
      videos.push($(this));
    });
    videosTotal = videos.length;
    console.log('videosTotal: ' + videosTotal + ', videosLoaded: ' + videosLoaded); // Loading progress event

    var loadedPercent = 0;
    var imgTotal = 0;

    var loadingAnim = function loadingAnim(per) {
      $('.uix-loader-progress > span').text($('.uix-loader-progress').data('txt').replace(/\{progress\}/g, per));
      TweenMax.to('.uix-loader-progress__line', 0.3, {
        width: per / 100.0 * window.innerWidth
      });
    };

    $('body').waitForImages().progress(function (loaded, count, success) {
      imgTotal = count;
      var per = parseInt(loaded / (count - (1 - videosTotal)) * 100); //

      if ($('img').length <= 1) {
        per = 100;
      } //


      if (isNaN(per)) per = 100; //

      loadedPercent = per; //animation classes for loader

      for (var i = 1; i < 10; i++) {
        if (per < i * 10) $('body').addClass('loaded' + i);
      } //loading animation


      loadingAnim(per);
    }).done(function () {
      //Event after loading is complete
      // Main scene
      console.log('loadedPercent: ' + loadedPercent + ', imageTotal: ' + imgTotal);
      mainObjLoader(loadedPercent, imgTotal);
    });
    /*
     * Main Object Loader
     *
     * @param  {Number} loadedPercent  - The percentage value after the page loads the image.
     * @param  {Number} imgTotal       - The total number of imags.
     * @return {Void}
     */

    function mainObjLoader(loadedPercent, imgTotal) {
      var remainedPercentComplete = 0;

      var loadedFun = function loadedFun() {
        //loading animation
        loadingAnim(100); //animation classes for loader

        $('body').addClass('loaded10'); // Remove loader

        TweenMax.to('.uix-loader, .uix-loader-progress, .uix-loader-progress__line', 0.5, {
          css: {
            opacity: 0,
            display: 'none'
          }
        }); //page animation when elements loaded
        //...
      }; //


      if (loadedPercent < 100) {
        videos.forEach(function (element) {
          var _src = element.find('source:first').attr('src');

          if (loader_typeof(_src) === ( true ? "undefined" : undefined)) _src = element.attr('src');
          var video = document.getElementById(element.attr('id')),
              videoURL = _src;
          video.addEventListener('loadedmetadata', function (e) {
            //Video has started loading successfully
            videosLoaded++; //get remained percent

            remainedPercentComplete = (1 - videosLoaded / videosTotal) * (100 - loadedPercent); //current percent

            var currentPercent = loadedPercent + (100 - loadedPercent - remainedPercentComplete); //loading animation

            loadingAnim(currentPercent); // All videos loaded

            if (currentPercent == 100) {
              loadedFun();
            } //debug


            console.log('remainedPercentComplete: ' + remainedPercentComplete + ', currentPercent: ' + currentPercent);
            console.log('videosTotal: ' + videosTotal + ', videosLoaded: ' + videosLoaded);
          }, false);
          video.src = videoURL;
        });
      } else {
        // All videos loaded
        if (remainedPercentComplete == 0) {
          loadedFun();
        }
      }
    }
  };

  module.components.documentReady.push(module.LOADER.documentReady);
  return function LOADER() {
    loader_classCallCheck(this, LOADER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/mega-menu.js
function mega_menu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Mega Menu -->
 *************************************
 */

var MEGA_MENU = function (module, $, window, document) {
  if (window.MEGA_MENU === null) return false;
  module.MEGA_MENU = module.MEGA_MENU || {};
  module.MEGA_MENU.version = '0.0.3';

  module.MEGA_MENU.pageLoaded = function () {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; // Using delay is for more accurate calculation

    setTimeout(function () {
      megaMenuInit(windowWidth);
    }, 500);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth; // Do stuff here

        megaMenuInit(windowWidth);
      }
    }); // Initialize mega menu

    function megaMenuInit(w) {
      var $menuWrap = $('.uix-menu__container:not(.is-mobile)'),
          maxWidth = 1140,
          //The maximum width of the mega menu wrapper
      //This value is equal to the $nav-mega-li-w variable in the SCSS
      perDefaultW = 270; //Default width of each column
      //New XL container for Bootstrap 4.x

      if (w > 1430) maxWidth = 1278; //Full width container

      maxWidth = windowWidth - 15; // Remove the html tag for mega menu item

      $menuWrap.find('li.multi-column  > ul .multi-column-title').each(function () {
        var mega_old_item = $(this).html();

        if (mega_old_item != '') {
          $(this).html(mega_old_item.replace(/<[^>]+>/g, ''));
        }
      });

      if (w > 768) {
        $menuWrap.find('li.multi-column').each(function (index) {
          var root_li = $(this),
              col_total = root_li.find('> ul > li').length,
              mega_div = root_li.find(' > ul.sub-menu'),
              mega_div_w = mega_div.width(),
              mega_single_w = null,
              root_li_left = null; // Add mega arrow

          if (root_li.find('.uix-menu__arrow-mega').length < 1) root_li.prepend('<span class="uix-menu__arrow-mega"></span>'); // Detecting if the right or left of the div is touching the browser window edge.

          if (col_total > 0) {
            root_li_left = UixCssProperty.getAbsoluteCoordinates(mega_div[0]).left; //Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu

            if (maxWidth > w) maxWidth = w;

            if (parseFloat(mega_div_w + 20) > maxWidth) {
              mega_div_w = maxWidth;
              mega_single_w = maxWidth / col_total - 2.888; //Resetting the width of each column

              mega_div.find('> li').css({
                'width': mega_single_w + 'px'
              }); //Resetting the width of each <li> tag

              mega_div.find('> li ul li').css({
                'width': mega_single_w + 'px'
              });

              if (!$('body').hasClass('rtl')) {
                mega_div.css({
                  'margin-left': -root_li_left + (w - mega_div_w) / 2 + 'px'
                });
              } else {
                mega_div.css({
                  'margin-right': -root_li_left + (w - mega_div_w) / 2 + 'px'
                });
              }
            } else {
              //Resetting the width of each column
              mega_div.find('> li').css({
                'width': perDefaultW + 'px'
              }); //Resetting the width of each <li> tag

              mega_div.find('> li ul li').css({
                'width': perDefaultW + 'px'
              });
              var chkWidth = parseFloat(root_li_left + mega_div_w);

              if (chkWidth > w) {
                if (!$('body').hasClass('rtl')) {
                  mega_div.css({
                    'margin-left': -(chkWidth - w) + 'px'
                  });
                } else {
                  mega_div.css({
                    'margin-right': -(chkWidth - w) + 'px'
                  });
                } //If the CSS sets the offset of ul::before
                //								const mega_div_offset = mega_div_w/2 - 0;
                //								
                //								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
                //									mega_div.css( {
                //										'margin-left' : - ( chkWidth - w ) + mega_div_offset + 'px'
                //									} );
                //								} else {
                //									mega_div.css( {
                //										'margin-right' : - ( chkWidth - w ) + mega_div_offset + 'px'
                //									} );
                //								}	

              }
            }
          }
        });
      }
    }
  };

  module.components.pageLoaded.push(module.MEGA_MENU.pageLoaded);
  return function MEGA_MENU() {
    mega_menu_classCallCheck(this, MEGA_MENU);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/mobile-menu.js
function mobile_menu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function mobile_menu_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { mobile_menu_typeof = function _typeof(obj) { return typeof obj; }; } else { mobile_menu_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return mobile_menu_typeof(obj); }

/* 
 *************************************
 * <!-- Mobile Menu -->
 *************************************
 */

var MOBILE_MENU = function (module, $, window, document) {
  if (window.MOBILE_MENU === null) return false;
  module.MOBILE_MENU = module.MOBILE_MENU || {};
  module.MOBILE_MENU.version = '0.0.8';

  module.MOBILE_MENU.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //-------- Show Toolbar when viewing site for WordPress
    //Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element

    var $el = $('.admin-bar .uix-menu-mobile__toggle');
    $window.off('scroll.MOBILE_MENU touchmove.MOBILE_MENU').on('scroll.MOBILE_MENU touchmove.MOBILE_MENU', function () {
      var scrolled = $(this).scrollTop(),
          spyTop = 46;

      if (scrolled >= spyTop) {
        $el.addClass('is-fixed');
      } else {
        $el.removeClass('is-fixed');
      }
    }); //-------- Mobile Menu

    var $toggle = $('.uix-menu-mobile__toggle'),
        $toggleBody = $('body'); //-------- Add mobile menu to your website

    $('nav.uix-menu__container').clone().addClass('is-mobile').appendTo('body'); //Wait until previous .appendTo() is complete

    $.when($('.uix-menu__container.is-mobile').length > 0).then(function () {
      $toggle.on('touchstart click', function (e) {
        e.preventDefault(); //Prevents further propagation of the current event in the capturing and bubbling phases.

        e.stopPropagation();
        $(this).toggleClass('is-opened');

        if ($(this).hasClass('is-opened')) {
          //Add mobile brand
          var logoURL = $('.uix-brand--mobile img').attr('src');

          if (mobile_menu_typeof(logoURL) !== ( true ? "undefined" : undefined) && logoURL != '') {
            if (logoURL.indexOf('blank.gif') >= 0) $('.mobile-inner').css('margin-top', '-70px');
          } //Toggle effect


          $toggleBody.addClass('js-uix-menu-opened');
        } else {
          $toggleBody.removeClass('js-uix-menu-opened');
        }
      }); //Mobile menu mask event

      $('.uix-menu-mobile__mask').on('click', function () {
        $toggle.removeClass('is-opened');
        $toggleBody.removeClass('js-uix-menu-opened');
      }); // Fires drop-menu event 

      var $drMenuLi = $('.uix-menu__container.is-mobile ul li');
      $drMenuLi.find('> a').on('click', function (e) {
        var arrowText = $(this).find('.uix-menu__arrow-mobile').text().replace(/(.).*\1/g, "$1"),
            $sub = $(this).next('ul');

        if ($sub.length > 0) {
          e.preventDefault(); //Its value is not a boolean but a string

          var expanded = $(this).attr('aria-expanded') == 'true' ? false : true;

          if (expanded) {
            //Hide other all sibling <ul> of the selected element
            var $e = $(this).parent('li').siblings().find('> a');
            $e.removeClass('is-opened').attr('aria-expanded', false);
            $e.parent('li').find('.uix-menu__arrow-mobile').removeClass('is-opened');
            $e.parent('li').removeClass('is-opened');
            $(this).addClass('is-opened').attr('aria-expanded', true);
            $(this).parent('li').find('.uix-menu__arrow-mobile').addClass('is-opened');
            $(this).parent('li').addClass('is-opened');
            TweenMax.to($e.next('ul'), 0.5, {
              height: 0
            }); //to open
            // - temporarilty set height:auto
            // - tween from height:0

            TweenMax.set($sub, {
              height: 'auto'
            });
            TweenMax.from($sub, 0.5, {
              height: 0
            });
          } else {
            $(this).removeClass('is-opened').attr('aria-expanded', false);
            $(this).parent('li').find('.uix-menu__arrow-mobile').removeClass('is-opened');
            $(this).parent('li').removeClass('is-opened'); //to close

            TweenMax.to($sub, 0.5, {
              height: 0
            });
          }

          return false;
        }
      });
      mobileMenuInit(windowWidth); // Close the menu on window change

      $window.on('resize', function () {
        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if (window.innerWidth != windowWidth) {
          // Update the window width for next time
          windowWidth = window.innerWidth; // Do stuff here

          $toggleBody.removeClass('js-uix-menu-opened');
          $toggle.removeClass('is-opened');
          mobileMenuInit(windowWidth);
        }
      });
    });
    /*
     * Initialize mobile menu
     *
     * @param  {Number} w                  - Returns width of browser viewport.
     * @return {Void}
     */

    function mobileMenuInit(w) {
      if (w <= 768) {
        $('.uix-menu__container.is-mobile .uix-menu > li').each(function () {
          if ($(this).find('ul').length > 0) {
            if ($(this).find('.uix-menu__arrow-mobile').length < 1) $(this).prepend('<em class="uix-menu__arrow-mobile"></em>');
            $(this).find('ul ul').addClass('sub-sub');
            $(this).find(' > a').attr('href', 'javascript:void(0);');
          }
        });
      }
    }
  };

  module.components.documentReady.push(module.MOBILE_MENU.documentReady);
  return function MOBILE_MENU() {
    mobile_menu_classCallCheck(this, MOBILE_MENU);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/navigation.js
function navigation_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function navigation_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { navigation_typeof = function _typeof(obj) { return typeof obj; }; } else { navigation_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return navigation_typeof(obj); }

/* 
 *************************************
 * <!-- Navigation -->
 *************************************
 */

var NAVIGATION = function (module, $, window, document) {
  if (window.NAVIGATION === null) return false;
  module.NAVIGATION = module.NAVIGATION || {};
  module.NAVIGATION.version = '0.0.8';

  module.NAVIGATION.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var ulForDesktop = '.uix-menu__container:not(.is-mobile) ul.uix-menu'; //-------- Menu selected (if it exists "data-current" property in <ul>)

    var curMenuIndex = $(ulForDesktop).data('current');

    if (navigation_typeof(curMenuIndex) !== ( true ? "undefined" : undefined)) {
      $(ulForDesktop + ' > li:eq(' + curMenuIndex + ')').addClass('is-active');
    } //-------- Menu Hover


    var mTop = 15;
    $(ulForDesktop + ' > li.multi-column > ul li ul').addClass('multi');
    $(ulForDesktop + ' > li:not(.multi-column) ul, .uix-menu__container:not(.is-mobile) li.multi-column > ul.sub-menu > li > ul, ' + ulForDesktop + ' li.multi-column > ul').css('margin-top', mTop + 'px');
    $(ulForDesktop + ' li').on('mouseenter', function () {
      TweenMax.set($(this).find(' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega'), {
        css: {
          opacity: 0,
          display: 'block',
          marginTop: mTop + 'px'
        },
        onComplete: function onComplete() {
          TweenMax.to(this.target, 0.3, {
            css: {
              opacity: 1,
              marginTop: 0
            },
            ease: Power2.easeOut
          });
        }
      });
    }).on('mouseleave', function () {
      TweenMax.to($(this).find(' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega'), 0.3, {
        css: {
          opacity: 0,
          marginTop: mTop + 'px'
        },
        onComplete: function onComplete() {
          TweenMax.set(this.target, {
            css: {
              display: 'none'
            }
          });
        }
      });
    }); //-------- Add Sub-menu Arrow

    $(ulForDesktop + ' li').each(function () {
      if ($(this).find('ul').length > 0) {
        $(this).prepend('<span class="uix-menu__arrow"></span>');
      }
    }); //-------- Sticky primary navigation
    //Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element

    var $el = $('.uix-menu__container:not(.is-mobile)');
    $window.off('scroll.NAVIGATION touchmove.NAVIGATION').on('scroll.NAVIGATION touchmove.NAVIGATION', function () {
      var scrolled = $(this).scrollTop(),
          spyTop = 220;

      if (scrolled >= spyTop) {
        $el.addClass('is-fixed');
      } else {
        $el.removeClass('is-fixed');
      }
    });
  };

  module.components.documentReady.push(module.NAVIGATION.documentReady);
  return function NAVIGATION() {
    navigation_classCallCheck(this, NAVIGATION);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/_global/js/fn/UixParallax.js
var UixParallax = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/set-background.js
function set_background_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function set_background_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { set_background_typeof = function _typeof(obj) { return typeof obj; }; } else { set_background_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return set_background_typeof(obj); }

/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */


var SET_BG = function (module, $, window, document) {
  if (window.SET_BG === null) return false;
  module.SET_BG = module.SET_BG || {};
  module.SET_BG.version = '0.0.6';

  module.SET_BG.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //  Initialize

    setBGInit(windowWidth, windowHeight);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight; // Do stuff here

        setBGInit(windowWidth, windowHeight);
      }
    });
    /*
     * Initialize background using "data-bg" attribute.
     *
     * @param  {Number} w         - Returns width of browser viewport
     * @param  {Number} h         - Returns height of browser viewport
     * @return {Void}
     */

    function setBGInit(w, h) {
      $('[data-bg]').each(function () {
        var $this = $(this);
        var config = $this.data('bg');

        if (set_background_typeof(config) === ( true ? "undefined" : undefined)) {
          config = {
            "src": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            "position": "top left",
            "size": "cover",
            "repeat": "no-repeat",
            "fill": false,
            "parallax": 0,
            "transition": "none 0s ease 0s",
            "move": false // {"dir":"left","duration":"10s","easing":"linear","loop":true}

          };
        }

        if (config) {
          var dataImg = config.src,
              dataPos = config.position,
              dataSize = config.size,
              dataRepeat = config.repeat,
              dataEasing = config.transition,
              dataParallax = config.parallax,
              dataMove = config.move;
          if (set_background_typeof(dataPos) === ( true ? "undefined" : undefined)) dataPos = 'top left';
          if (set_background_typeof(dataSize) === ( true ? "undefined" : undefined)) dataSize = 'cover';
          if (set_background_typeof(dataRepeat) === ( true ? "undefined" : undefined)) dataRepeat = 'no-repeat';
          if (set_background_typeof(dataEasing) === ( true ? "undefined" : undefined)) dataEasing = 'none 0s ease 0s';
          if (set_background_typeof(dataMove) === ( true ? "undefined" : undefined)) dataMove = false; //Using parallax

          if (dataParallax && set_background_typeof(dataParallax) != ( true ? "undefined" : undefined) && dataParallax != 0) {
            dataPos = dataPos.replace('top', '50%');
          } //background animation


          var moveAnim = 'none',
              moveAnimLoop = 'infinite',
              moveEasing = 'linear',
              moveKeyframesTop = '@keyframes js-uix-cssanim--move-t{from{background-position:0 0;}to{background-position:0 -19999px;}',
              moveKeyframesBottom = '@keyframes js-uix-cssanim--move-b{from{background-position:0 0;}to{background-position:0 19999px;}',
              moveKeyframesLeft = '@keyframes js-uix-cssanim--move-l{from{background-position:0 0;}to{background-position:-19999px 0;}',
              moveKeyframesRight = '@keyframes js-uix-cssanim--move-r{from{background-position:0 0;}to{background-position:19999px 0;}';

          if (dataMove && Object.prototype.toString.call(dataMove) == '[object Object]') {
            if (!dataMove.loop) moveAnimLoop = '1 forwards';
            dataPos = '0 0';

            switch (dataMove.dir) {
              case 'top':
                moveAnim = 'js-uix-cssanim--move-t ' + parseInt(dataMove.speed) + 's ' + moveEasing + ' ' + moveAnimLoop;
                break;

              case 'bottom':
                moveAnim = 'js-uix-cssanim--move-b ' + parseInt(dataMove.speed) + 's ' + moveEasing + ' ' + moveAnimLoop;
                break;

              case 'left':
                moveAnim = 'js-uix-cssanim--move-l ' + parseInt(dataMove.speed) + 's ' + moveEasing + ' ' + moveAnimLoop;
                break;

              case 'right':
                moveAnim = 'js-uix-cssanim--move-r ' + parseInt(dataMove.speed) + 's ' + moveEasing + ' ' + moveAnimLoop;
                break;
            } //  CSS3 animation keyframe attributes inline


            if ($('#js-uix-cssanim--move-t').length == 0) {
              $('<style id="js-uix-cssanim--move-t">').text(moveKeyframesTop).appendTo('head');
            }

            if ($('#js-uix-cssanim--move-b').length == 0) {
              $('<style id="js-uix-cssanim--move-b">').text(moveKeyframesBottom).appendTo('head');
            }

            if ($('#js-uix-cssanim--move-l').length == 0) {
              $('<style id="js-uix-cssanim--move-l">').text(moveKeyframesLeft).appendTo('head');
            }

            if ($('#js-uix-cssanim--move-r').length == 0) {
              $('<style id="js-uix-cssanim--move-r">').text(moveKeyframesRight).appendTo('head');
            }
          } //-----


          if (set_background_typeof(dataImg) != ( true ? "undefined" : undefined) && dataImg != '') {
            if (config.fill) {
              //Show Image Under Text
              if (Modernizr.cssanimations) {
                $this.css({
                  'background': 'url(' + dataImg + ') ' + dataRepeat + '',
                  'background-size': dataSize,
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent',
                  'animation': moveAnim
                });
              }
            } else {
              $this.css({
                'background-image': 'url(' + dataImg + ')',
                'background-position': dataPos,
                'background-size': dataSize,
                'background-repeat': dataRepeat,
                'animation': moveAnim
              });
            } //Using parallax


            if (dataParallax && set_background_typeof(dataParallax) != ( true ? "undefined" : undefined) && dataParallax != 0) {
              $this.UixParallax({
                'speed': dataParallax,
                transition: dataEasing,
                'bg': {
                  enable: true,
                  xPos: '50%'
                }
              });
            }
          }
        }
      });
    }
  };

  module.components.documentReady.push(module.SET_BG.documentReady);
  return function SET_BG() {
    set_background_classCallCheck(this, SET_BG);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/_global/js/modules/videos.js
function videos_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function videos_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { videos_typeof = function _typeof(obj) { return typeof obj; }; } else { videos_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return videos_typeof(obj); }

/* 
 *************************************
 * <!-- Videos -->
 *************************************
 */

var VIDEOS = function (module, $, window, document) {
  if (window.VIDEOS === null) return false;
  module.VIDEOS = module.VIDEOS || {};
  module.VIDEOS.version = '0.1.3';

  module.VIDEOS.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    /* 
     ---------------------------
     Video Embed
     ---------------------------
     */

    $('.uix-video').each(function () {
      var $this = $(this);
      var curVideoID = $this.find('video').attr('id'),
          coverPlayBtnID = 'videocover-' + curVideoID,
          videoWrapperW = $this.closest('[data-embed-video-wrapper]').width();
      var dataAuto = $this.data('embed-video-autoplay'),
          dataLoop = $this.data('embed-video-loop'),
          dataControls = $this.data('embed-video-controls'),
          dataW = $this.data('embed-video-width'),
          dataH = $this.data('embed-video-height'); //Push a new ID to video
      //Solve the problem that ajax asynchronous loading does not play

      $this.find('.video-js').attr('id', curVideoID);

      if (videos_typeof(dataAuto) === ( true ? "undefined" : undefined)) {
        dataAuto = true;
      }

      if (videos_typeof(dataLoop) === ( true ? "undefined" : undefined)) {
        dataLoop = true;
      }

      if (videos_typeof(dataControls) === ( true ? "undefined" : undefined)) {
        dataControls = false;
      }

      if (videos_typeof(dataW) === ( true ? "undefined" : undefined) || dataW == 'auto') {
        dataW = videoWrapperW;
      }

      if (videos_typeof(dataH) === ( true ? "undefined" : undefined) || dataH == 'auto') {
        dataH = videoWrapperW / 1.77777777777778;
      } //Display cover and play buttons when some mobile device browsers cannot automatically play video


      if ($('#' + coverPlayBtnID).length == 0) {
        $('<div id="' + coverPlayBtnID + '" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url(' + $this.find('video').attr('poster') + ')"></span><span class="uix-video__cover__playbtn"></span></div>').insertBefore($this);
        var btnEv = Modernizr.touchevents ? 'touchstart' : 'click';
        $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').on(btnEv, function (e) {
          e.preventDefault();
          myPlayer.play();
          $('#' + coverPlayBtnID).hide();
        }); //Prevent some devices from automatically playing video and trigger with buttons

        if (!dataAuto || browser.isAndroid) {
          $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
        }
      }
      /* ---------  HTML5 video autoplay on mobile revisited  */


      if (windowWidth <= 768) {
        $this.find('.video-js').attr({
          'playsinline': 'true'
        });
      }

      var myPlayer = videojs(curVideoID, {
        width: dataW,
        height: dataH,
        loop: dataLoop,
        autoplay: dataAuto
      }, function onPlayerReady() {
        var initVideo = function initVideo(obj) {
          //Get Video Dimensions
          var curW = obj.videoWidth(),
              curH = obj.videoHeight(),
              newW = curW,
              newH = curH;
          newW = videoWrapperW; //Scaled/Proportional Content 

          newH = curH * (newW / curW);

          if (!isNaN(newW) && !isNaN(newH)) {
            obj.height(newH);
            obj.width(newW);
          } //Show this video wrapper


          $this.css('visibility', 'visible'); //Hide loading effect

          $this.find('.vjs-loading-spinner, .vjs-big-play-button').hide();
        };

        initVideo(this);
        /* ---------  Video initialize */

        this.on('loadedmetadata', function () {
          initVideo(this);
        });
        /* ---------  Set, tell the player it's in fullscreen  */

        if (dataAuto) {
          this.muted(true); //Fix an error of Video auto play is not working in browser

          this.play();
        }
        /* ---------  Disable control bar play button click */


        if (!dataControls) {
          this.controls(false);
        }
        /* ---------  Determine if the video is auto played from mobile devices  */


        var autoPlayOK = false;
        this.on('timeupdate', function () {
          var duration = this.duration();

          if (duration > 0) {
            autoPlayOK = true;

            if (this.currentTime() > 0) {
              autoPlayOK = true;
              this.off('timeupdate'); //Hide cover and play buttons when the video automatically played

              $('#' + coverPlayBtnID).hide();
            }
          }
        });
      });
    });
    /* 
     ---------------------------
     Video Popup Interaction
     ---------------------------
     */

    var modalDialogTrigger = '[data-video-win]'; //Add video container

    $(modalDialogTrigger).each(function () {
      var $this = $(this);
      var videoSrcIfm = '',
          videoSrcMp4 = $this.data('video-mp4'),
          videoSrcWebm = $this.data('video-webm'),
          videoSrcOgv = $this.data('video-ogv'),
          videoPoster = $this.data('video-poster'),
          videoContainerMid = $this.data('modal-id'),
          videoContainerVid = videoContainerMid + '--videopush';

      if (videos_typeof(videoSrcMp4) === ( true ? "undefined" : undefined)) {
        videoSrcMp4 = '';
      }

      if (videos_typeof(videoSrcWebm) === ( true ? "undefined" : undefined)) {
        videoSrcWebm = '';
      }

      if (videos_typeof(videoSrcOgv) === ( true ? "undefined" : undefined)) {
        videoSrcOgv = '';
      }

      if ($this.find('[data-video-iframe]').length > 0) {
        videoSrcIfm = $this.find('[data-video-iframe]').html();
      } //Add modal dialog


      if ($('#' + videoContainerMid).length == 0) {
        var v = '',
            vmp4 = '',
            vwebm = '',
            vogv = '';

        if (videoSrcMp4 != '') {
          vmp4 = '<source src="' + videoSrcMp4 + '" type="video/mp4">';
        }

        if (videoSrcWebm != '') {
          vwebm = '<source src="' + videoSrcWebm + '" type="video/webm">';
        }

        if (videoSrcOgv != '') {
          vogv = '<source src="' + videoSrcOgv + '" type="video/ogv">';
        }

        v += '<div class="uix-modal-box is-fullscreen is-video" role="dialog" tabindex="-1" aria-hidden="true" id="' + videoContainerMid + '">';
        v += '<button type="button" class="uix-modal-box__close" data-modal-close-trigger="true"></button>';
        v += '<div class="uix-modal-box__content" role="document">';
        v += '<div class="uix-modal-box__video-waiting"></div><div class="uix-modal-box__video-container" data-video-player-init="0">';

        if ($this.find('[data-video-iframe]').length > 0 && videoSrcIfm != '') {
          //If iframe
          v += '<div id="' + videoContainerVid + '" class="embed-responsive embed-responsive-16by9">';
          v += videoSrcIfm;
          v += '</div>';
        } else {
          //If local video
          v += '<video id="' + videoContainerVid + '" class="video-js vjs-default-skin" controls poster="' + videoPoster + '">';
          v += vmp4 + vwebm + vogv;
          v += '</video>';
        }

        v += '</div>';
        v += '</div>';
        v += '</div>'; //Wait until previous .append() is complete

        $(v).appendTo('body');
      }
    }); //Check out: http://docs.videojs.com/tutorial-player-workflows.html

    $(document).off('click.VIDEOS').on('click.VIDEOS', modalDialogTrigger, function () {
      var vid = $(this).data('modal-id') + '--videopush',
          newMaxW = windowWidth - 80,
          newMaxH = windowHeight - 80,
          $vContainer = $('#' + vid).closest('.uix-modal-box__video-container'),
          $vLoader = $vContainer.prev('.uix-modal-box__video-waiting'),
          myPlayerInit = $vContainer.data('video-player-init');
      var $ifm = false; //----- Hidden/Display the wrapper of video

      var displayVC = function displayVC() {
        TweenMax.set($vContainer, {
          alpha: 1
        });
        $vLoader.removeClass('is-active');
      };

      var hiddenVC = function hiddenVC() {
        TweenMax.set($vContainer, {
          alpha: 0
        });
        $vLoader.addClass('is-active');
      }; //----- Embed iframe


      if ($('#' + vid).find('iframe').length > 0) {
        $ifm = $('#' + vid).find('iframe');
      } else {
        hiddenVC();
      }

      if ($ifm && videos_typeof($ifm) === 'object') {
        if ($ifm.length > 0) {
          var curW = $ifm.width(),
              curH = $ifm.height(),
              newW = curW,
              newH = curH;

          if (curH > newMaxH) {
            newH = newMaxH; //Scaled/Proportional Content 

            newW = curW * (newH / curH);
          }

          if (newW > newMaxW) {
            newW = newMaxW; //Scaled/Proportional Content 

            newH = curH * (newW / curW);
          }

          $ifm.css({
            'left': (newMaxW - newW) / 2 + 'px',
            'top': (newMaxH - newH) / 2 + 'px',
            'height': newH + 'px',
            'width': newW + 'px'
          });

          if (windowWidth <= 768) {
            $ifm.css({
              'top': 0
            }).parent('.embed-responsive').css({
              'top': (newMaxH - newH) / 2 + 'px'
            });
          }
        }

        return false;
      } //----- HTML5 video autoplay on mobile revisited


      if (windowWidth <= 768) {
        $('#' + vid).attr({
          'playsinline': 'true'
        });
      } //----- Embed local video


      var myPlayer = videojs(vid, {
        width: 1,
        height: 1,
        autoplay: true,
        loop: true
      }, function onPlayerReady() {
        var initVideo = function initVideo(obj) {
          //Get Video Dimensions
          var curW = obj.videoWidth(),
              curH = obj.videoHeight(),
              newW = curW,
              newH = curH; //Resise modal

          if (curH > newMaxH) {
            newH = newMaxH; //Scaled/Proportional Content 

            newW = curW * (newH / curH);
          }

          if (newW > newMaxW) {
            newW = newMaxW; //Scaled/Proportional Content 

            newH = curH * (newW / curW);
          }

          obj.height(newH);
          obj.width(newW); //In order to allow CSS to support video centering

          $vContainer.find(' > div.video-js').css({
            'width': newW + 'px'
          }); //Vertically center the video area

          var mt = parseFloat(windowHeight - newH) / 2 - 50;
          $vContainer.css({
            'transform': 'translateY(' + mt + 'px)'
          }); //Display the wrapper of video

          displayVC();
        };

        initVideo(this);
        /* ---------  Video Modal initialize */

        this.on('loadedmetadata', function () {
          initVideo(this); //If a player instance has already been created for this variable.

          $vContainer.data('video-player-init', 1);
        });
        /* ---------  Set, tell the player it's in fullscreen  */
        //this.exitFullscreen();
        //this.requestFullscreen();

        this.play();
        /* ---------  Disable control bar play button click */
        //this.controls( false );

        /* ---------  Display video playback progress  */

        this.on('timeupdate', function () {
          var duration = this.duration(),
              progressAmount = '0%';

          if (duration > 0) {
            progressAmount = this.currentTime() / duration * 100 + "%";
          } //console.log( progressAmount );

        });
        /* ---------  Callback for when a video has ended */

        this.on('ended', function () {//console.log( 'video is done!' );
        });
      });
      /* ---------  Display the wrapper of video  */

      if (myPlayerInit === 1) {
        displayVC();
      }
      /* ---------  Close the modal  */


      $(document).off('click.VIDEOS_CLOSE').on('click.VIDEOS_CLOSE', '.uix-modal-box [data-modal-close-trigger], .uix-modal-mask:not(.js-uix-disabled)', function () {
        myPlayer.ready(function () {
          this.pause();
        });
      });
    });
  };

  module.components.documentReady.push(module.VIDEOS.documentReady);
  return function VIDEOS() {
    videos_classCallCheck(this, VIDEOS);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/_main/scss/_style.scss
var scss_style = __webpack_require__(5);

// CONCATENATED MODULE: ./src/components/ES6/_main/js/index.js
function js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Theme Scripts  -->
 *************************************
 */


var MAIN = function (module, $, window, document) {
  if (window.MAIN === null) return false;
  module.MAIN = module.MAIN || {};
  module.MAIN.version = '0.0.1';

  module.MAIN.documentReady = function ($) {
    /* 
     ---------------------------
     Function Here
     ---------------------------
     */
    //your code here...
  };

  module.MAIN.pageLoaded = function () {
    /* 
     ---------------------------
     Function Here
     ---------------------------
     */
    //your code here...
  };

  module.components.documentReady.push(module.MAIN.documentReady);
  module.components.pageLoaded.push(module.MAIN.pageLoaded);
  return function MAIN() {
    js_classCallCheck(this, MAIN);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/accordion-img/scss/_style.scss
var accordion_img_scss_style = __webpack_require__(6);

// CONCATENATED MODULE: ./src/components/ES6/accordion-img/js/index.js
function accordion_img_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { js_typeof = function _typeof(obj) { return typeof obj; }; } else { js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return js_typeof(obj); }

/* 
 *************************************
 * <!-- Accordion Background Images -->
 *************************************
 */


var ACCORDION_BG = function (module, $, window, document) {
  if (window.ACCORDION_BG === null) return false;
  module.ACCORDION_BG = module.ACCORDION_BG || {};
  module.ACCORDION_BG.version = '0.0.6';

  module.ACCORDION_BG.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    if (windowWidth <= 768) return false;
    $('.uix-accordion-img').each(function () {
      var $this = $(this);
      var aEvent = $this.data('event'),
          outReset = $this.data('out-reset'),
          activeIndex = $this.data('actived-item'),
          widthShow = $this.data('width-show'),
          closeBtn = $this.data('close-btn'),
          $li = $this.find('ul').children('li'),
          total = $li.length;

      if (js_typeof(activeIndex) === ( true ? "undefined" : undefined)) {
        activeIndex = false;
      }

      if (js_typeof(aEvent) === ( true ? "undefined" : undefined)) {
        aEvent = 'click';
      }

      if (js_typeof(outReset) === ( true ? "undefined" : undefined)) {
        outReset = true;
      }

      if (js_typeof(widthShow) === ( true ? "undefined" : undefined)) {
        widthShow = '60%';
      } //Initialize the width of each item


      itemInit();
      $li.on(aEvent, function (e) {
        //Prevents further propagation of the current event in the capturing and bubbling phases.
        e.stopPropagation(); //Apply click method to outer div but not inner div

        if (e.target.className == 'uix-accordion-img__content') {
          if ($(this).hasClass('is-active')) {
            $(this).addClass('is-active');
          } else {
            $li.addClass('active-sub');
            $(this).addClass('is-active');
            $(this).siblings().removeClass('is-active');
            $li.css('width', (100 - parseFloat(widthShow)) / (total - 1) + '%');
            $(this).css('width', widthShow);
          }
        }
      });

      if (outReset) {
        $this.on('mouseleave', function (e) {
          itemInit();
        });
      }

      if (js_typeof(closeBtn) != ( true ? "undefined" : undefined) && closeBtn != false && closeBtn != '') {
        $(closeBtn).off('click').on('click', function (e) {
          e.preventDefault();
          itemInit();
        });
      }
      /*
       * Active the target item
       *
          * @param  {Number} index     - The index value of the item to be activated.
       * @return {Void}
       */


      function itemActiveItem(index) {
        if (index >= 0) {
          $li.css('width', (100 - parseFloat(widthShow)) / (total - 1) + '%');
          $li.eq(index).css('width', widthShow).addClass('is-active');
        }
      }

      itemActiveItem(parseFloat(activeIndex));
      /*
       * Initialize the width of each item
       *
       * @return {Void}
       */

      function itemInit() {
        $li.removeClass('is-active active-sub').css('width', 100 / total + '%');
      }
    });
  };

  module.components.documentReady.push(module.ACCORDION_BG.documentReady);
  return function ACCORDION_BG() {
    accordion_img_js_classCallCheck(this, ACCORDION_BG);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/accordion/scss/_style.scss
var accordion_scss_style = __webpack_require__(7);

// CONCATENATED MODULE: ./src/components/ES6/accordion/js/index.js
function accordion_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function accordion_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { accordion_js_typeof = function _typeof(obj) { return typeof obj; }; } else { accordion_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return accordion_js_typeof(obj); }

/* 
 *************************************
 * <!-- Accordion -->
 *************************************
 */


var ACCORDION = function (module, $, window, document) {
  if (window.ACCORDION === null) return false;
  module.ACCORDION = module.ACCORDION || {};
  module.ACCORDION.version = '0.0.3';

  module.ACCORDION.documentReady = function ($) {
    $('.uix-accordion').each(function () {
      var $this = $(this);
      var $li = $this.children('dl'),
          $titlebox = $this.find('dt');
      var aEvent = $this.data('event'),
          firstShow = $this.data('first-show');

      var openItem = function openItem(obj) {
        //to open
        // - temporarilty set height:auto
        // - tween from height:0
        TweenMax.set(obj, {
          height: 'auto'
        });
        TweenMax.from(obj, 0.5, {
          height: 0
        });
      };

      if (accordion_js_typeof(aEvent) === ( true ? "undefined" : undefined)) {
        aEvent = 'click';
      }

      if (accordion_js_typeof(firstShow) === ( true ? "undefined" : undefined)) {
        firstShow = false;
      }

      if (firstShow) {
        $li.first().addClass('is-active').attr('aria-expanded', true);
        openItem($li.first().find('dd'));
      }

      $li.off(aEvent).on(aEvent, function (e) {
        //Prevents further propagation of the current event in the capturing and bubbling phases.
        e.stopPropagation(); //Its value is not a boolean but a string

        var expanded = $(this).attr('aria-expanded') == 'true' ? false : true,
            $content = $(this).find('dd');

        if (expanded) {
          //Hide other all sibling <dt> of the selected element
          var $e = $(this).siblings();
          $e.removeClass('is-active').attr('aria-expanded', false);
          $(this).addClass('is-active').attr('aria-expanded', true);
          TweenMax.to($e.find('dd'), 0.5, {
            height: 0
          }); //to open

          openItem($content);
        } else {
          if (e.type == 'click') {
            $(this).removeClass('is-active').attr('aria-expanded', false); //to close

            TweenMax.to($content, 0.5, {
              height: 0
            });
          }
        }
      });
    });
  };

  module.components.documentReady.push(module.ACCORDION.documentReady);
  return function ACCORDION() {
    accordion_js_classCallCheck(this, ACCORDION);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/advanced-content-slider/scss/_style.scss
var advanced_content_slider_scss_style = __webpack_require__(8);

// CONCATENATED MODULE: ./src/components/ES6/advanced-content-slider/js/index.js
function advanced_content_slider_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function advanced_content_slider_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { advanced_content_slider_js_typeof = function _typeof(obj) { return typeof obj; }; } else { advanced_content_slider_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return advanced_content_slider_js_typeof(obj); }

/* 
 *************************************
 * <!-- Advanced Content Slider -->
 *************************************
 */

/**
 * module.ADVANCED_CONTENT_SLIDER
 * 
 * @requires ./examples/assets/js/min/hammer.min.js
 */


var ADVANCED_CONTENT_SLIDER = function (module, $, window, document) {
  if (window.ADVANCED_CONTENT_SLIDER === null) return false;
  module.ADVANCED_CONTENT_SLIDER = module.ADVANCED_CONTENT_SLIDER || {};
  module.ADVANCED_CONTENT_SLIDER.version = '0.0.7';

  module.ADVANCED_CONTENT_SLIDER.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var animSpeed = 1200;
    sliderInit();
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;
        sliderInit();
      }
    });
    /*
     * Initialize slideshow
     *
     * @return {Void}
     */

    function sliderInit() {
      $('.uix-advanced-content-slider').each(function () {
        var $this = $(this);
        var $items = $this.find('.uix-advanced-content-slider__item'),
            $itemsWrapper = $this.children('.uix-advanced-content-slider__inner'),
            $first = $items.first(),
            itemWidth = $this.width(),
            itemsTotal = $items.length,
            totalWidth = itemWidth * itemsTotal,
            activated = $this.data('activated');
        var dataControlsPaginationAuto = false;

        if (advanced_content_slider_js_typeof(activated) === ( true ? "undefined" : undefined) || activated === 0) {
          //Get parameter configuration from the data-* attribute of HTML
          var dataControlsPagination = $this.data('controls-pagination'),
              dataControlsArrows = $this.data('controls-arrows'),
              dataDraggable = $this.data('draggable'),
              dataDraggableCursor = $this.data('draggable-cursor'),
              dataAuto = $this.data('auto'),
              dataTiming = $this.data('timing'),
              dataLoop = $this.data('loop'),
              dataSpeed = $this.data('speed');
          if (advanced_content_slider_js_typeof(dataControlsPagination) === ( true ? "undefined" : undefined)) dataControlsPagination = '.uix-advanced-content-slider-sp-pagination';
          if (advanced_content_slider_js_typeof(dataControlsArrows) === ( true ? "undefined" : undefined)) dataControlsArrows = '.uix-advanced-content-slider-sp-arrows';
          if (advanced_content_slider_js_typeof(dataDraggable) === ( true ? "undefined" : undefined)) dataDraggable = false;
          if (advanced_content_slider_js_typeof(dataDraggableCursor) === ( true ? "undefined" : undefined)) dataDraggableCursor = 'move';
          if (advanced_content_slider_js_typeof(dataAuto) === ( true ? "undefined" : undefined)) dataAuto = false;
          if (advanced_content_slider_js_typeof(dataTiming) === ( true ? "undefined" : undefined)) dataTiming = 10000;
          if (advanced_content_slider_js_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = false; //Autoplay times

          var playTimes; //A function called "timer" once every second (like a digital watch).

          $this[0].animatedSlides; //Navigation ID for paging control of each slide is automatically numbered.

          if ($(dataControlsPagination).html().length == 0) dataControlsPaginationAuto = true; //Get the animation speed
          //-------------------------------------	

          if (advanced_content_slider_js_typeof(dataSpeed) != ( true ? "undefined" : undefined) && dataSpeed != false) {
            animSpeed = dataSpeed;
          } //Initialize the width of each item
          //-------------------------------------		


          $first.addClass('is-active');
          $items.css('width', itemWidth + 'px');
          TweenMax.set($itemsWrapper, {
            width: totalWidth,
            onComplete: function onComplete() {
              $this.css('height', 'auto');
            }
          }); //Add identifiers for the first and last items
          //-------------------------------------		

          $items.last().addClass('last');
          $items.first().addClass('first'); //Pagination dots 
          //-------------------------------------	

          if (dataControlsPaginationAuto) {
            var _dot = '',
                _dotActive = '';
            _dot += '<ul class="uix-advanced-content-slider__pagination--default">';

            for (var i = 0; i < itemsTotal; i++) {
              _dotActive = i == 0 ? 'class="is-active"' : '';
              _dot += '<li><a ' + _dotActive + ' data-index="' + i + '" href="javascript:"></a></li>';
            }

            _dot += '</ul>';
            if ($(dataControlsPagination).html() == '') $(dataControlsPagination).html(_dot);
          } else {
            $(dataControlsPagination).find('li').first().find('a').addClass('is-active');
            $(dataControlsPagination).find('li').first().addClass('is-active');
          }

          $(dataControlsPagination).find('li a').off('click').on('click', function (e) {
            e.preventDefault(); //Prevent buttons' events from firing multiple times

            var $btn = $(this);
            if ($btn.attr('aria-disabled') == 'true') return false;
            $(dataControlsPagination).find('li a').attr('aria-disabled', 'true');
            setTimeout(function () {
              $(dataControlsPagination).find('li a').attr('aria-disabled', 'false');
            }, animSpeed);

            if (!$(this).hasClass('is-active')) {
              sliderUpdates($(this).attr('data-index'), $this, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }
          }); //Next/Prev buttons
          //-------------------------------------		

          var _prev = $(dataControlsArrows).find('.uix-advanced-content-slider__arrows--prev'),
              _next = $(dataControlsArrows).find('.uix-advanced-content-slider__arrows--next');

          $(dataControlsArrows).find('a').attr('href', 'javascript:');

          if (!dataLoop) {
            _prev.addClass('is-disabled');
          }

          _prev.off('click').on('click', function (e) {
            e.preventDefault(); //Prevent buttons' events from firing multiple times

            if (_prev.attr('aria-disabled') == 'true') return false;

            _prev.attr('aria-disabled', 'true');

            setTimeout(function () {
              _prev.attr('aria-disabled', 'false');
            }, animSpeed);
            sliderUpdates(parseFloat($items.filter('.is-active').index()) - 1, $this, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

            clearInterval($this[0].animatedSlides);
          });

          _next.off('click').on('click', function (e) {
            e.preventDefault(); //Prevent buttons' events from firing multiple times

            if (_next.attr('aria-disabled') == 'true') return false;

            _next.attr('aria-disabled', 'true');

            setTimeout(function () {
              _next.attr('aria-disabled', 'false');
            }, animSpeed);
            sliderUpdates(parseFloat($items.filter('.is-active').index()) + 1, $this, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

            clearInterval($this[0].animatedSlides);
          }); //Drag and Drop
          //-------------------------------------	


          var $dragDropTrigger = $this,
              hammerProps = {}; //Make the cursor a move icon when a user hovers over an item

          if (dataDraggable && dataDraggableCursor != '' && dataDraggableCursor != false) $dragDropTrigger.css('cursor', dataDraggableCursor);

          if (!dataDraggable) {
            hammerProps = {
              inputClass: Hammer.TouchInput
            };
          } //Mouse event
          //Hammer.js pan event only for touch devices and not for desktop computer Click+Drag


          var direction,
              dragDropElement = $dragDropTrigger[0],
              dragDropMC = new Hammer(dragDropElement, hammerProps);
          dragDropMC.on('panright press panleft', function (ev) {
            //Set the direction in here
            direction = ev.type;
          });
          dragDropMC.on('panend', function (ev) {
            //Use the direction in here
            //You know the pan has ended
            //and you know which action they were taking
            if (direction == 'panleft') {
              sliderUpdates(parseFloat($items.filter('.is-active').index()) + 1, $this, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }

            if (direction == 'panright') {
              sliderUpdates(parseFloat($items.filter('.is-active').index()) - 1, $this, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }
          }); //Autoplay Slider
          //-------------------------------------		

          if (dataAuto && !isNaN(parseFloat(dataTiming)) && isFinite(dataTiming)) {
            sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataControlsPagination, dataControlsArrows);
            $this.on({
              mouseenter: function mouseenter() {
                clearInterval($this[0].animatedSlides);
              },
              mouseleave: function mouseleave() {
                sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataControlsPagination, dataControlsArrows);
              }
            });
          } //Prevents front-end javascripts that are activated with AJAX to repeat loading.


          $this.data('activated', 1);
        } //endif activated        

      });
    }
    /*
     * Trigger slider autoplay
     *
     * @param  {Function} playTimes      - Number of times.
     * @param  {Number} timing           - Autoplay interval.
     * @param  {Boolean} loop            - Gives the slider a seamless infinite loop.
     * @param  {Element} slider           - Selector of the slider .
           * @param  {String} paginationID     - Navigation ID for paging control of each slide.
           * @param  {String} arrowsID         - Previous/Next arrow navigation ID.
     * @return {Void}                    - The constructor.
     */


    function sliderAutoPlay(playTimes, timing, loop, slider, paginationID, arrowsID) {
      var items = slider.find('.uix-advanced-content-slider__item'),
          total = items.length;
      slider[0].animatedSlides = setInterval(function () {
        playTimes = parseFloat(items.filter('.is-active').index());
        playTimes++;

        if (!loop) {
          if (playTimes < total && playTimes >= 0) {
            var slideNextId = playTimes;
            sliderUpdates(slideNextId, slider, paginationID, arrowsID, loop);
          }
        } else {
          if (playTimes == total) playTimes = 0;
          if (playTimes < 0) playTimes = total - 1;
          var _slideNextId = playTimes; //Prevent problems with styles when switching in positive order

          sliderUpdates(_slideNextId, slider, paginationID, arrowsID, loop);
        }
      }, timing);
    }
    /*
     * Transition Between Slides
     *
     * @param  {Number} elementIndex     - Index of current slider.
     * @param  {Element} slider           - Selector of the slider .
           * @param  {String} paginationID     - Navigation ID for paging control of each slide.
           * @param  {String} arrowsID         - Previous/Next arrow navigation ID.
           * @param  {Boolean} loop            - Gives the slider a seamless infinite loop.
     * @return {Void}
     */


    function sliderUpdates(elementIndex, slider, paginationID, arrowsID, loop) {
      var $items = slider.find('.uix-advanced-content-slider__item'),
          itemsTotal = $items.length,
          $prev = $(arrowsID).find('.uix-advanced-content-slider__arrows--prev'),
          $next = $(arrowsID).find('.uix-advanced-content-slider__arrows--next'),
          $pagination = $(paginationID).find('li a');
      $pagination.removeClass('is-active');
      $pagination.parent().removeClass('is-active');

      if (loop) {
        if (elementIndex == itemsTotal) elementIndex = 0;
        if (elementIndex < 0) elementIndex = itemsTotal - 1;
      } else {
        if (elementIndex > parseFloat(itemsTotal - 1)) elementIndex = parseFloat(itemsTotal - 1);
        if (elementIndex < 0) elementIndex = 0;
        $next.removeClass('is-disabled');
        $prev.removeClass('is-disabled');
        if (elementIndex == itemsTotal - 1) $next.addClass('is-disabled');
        if (elementIndex == 0) $prev.addClass('is-disabled');
      }

      $items.removeClass('is-active');
      $items.eq(elementIndex).addClass('is-active');
      $pagination.eq(elementIndex).addClass('is-active');
      $pagination.eq(elementIndex).parent().addClass('is-active');
      TweenMax.to(slider.children('.uix-advanced-content-slider__inner'), animSpeed / 1000, {
        x: '-' + slider.width() * elementIndex,
        onComplete: function onComplete() {},
        ease: Power3.easeOut
      });
    }
  };

  module.components.documentReady.push(module.ADVANCED_CONTENT_SLIDER.documentReady);
  return function ADVANCED_CONTENT_SLIDER() {
    advanced_content_slider_js_classCallCheck(this, ADVANCED_CONTENT_SLIDER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/advanced-slider/scss/_basic.scss
var _basic = __webpack_require__(9);

// CONCATENATED MODULE: ./src/components/ES6/advanced-slider/js/basic.js
function basic_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function basic_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { basic_typeof = function _typeof(obj) { return typeof obj; }; } else { basic_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return basic_typeof(obj); }

/* 
 *************************************
 * <!-- Advanced Slider (Basic) -->
 *************************************
 */


var ADVANCED_SLIDER = function (module, $, window, document) {
  if (window.ADVANCED_SLIDER === null) return false;
  module.ADVANCED_SLIDER = module.ADVANCED_SLIDER || {};
  module.ADVANCED_SLIDER.version = '0.1.9';

  module.ADVANCED_SLIDER.pageLoaded = function () {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var animDelay = 0;
    var $sliderWrapper = $('.uix-advanced-slider');
    sliderInit(false);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;
        sliderInit(true);
      }
    });
    /*
     * Initialize slideshow
     *
     * @param  {Boolean} resize            - Determine whether the window size changes.
     * @return {Void}
     */

    function sliderInit(resize) {
      $sliderWrapper.each(function () {
        var $this = $(this);
        var $items = $this.find('.uix-advanced-slider__item'),
            $first = $items.first(),
            activated = $this.data('activated');
        var nativeItemW, nativeItemH;

        if (basic_typeof(activated) === ( true ? "undefined" : undefined) || activated === 0) {
          //Get parameter configuration from the data-* attribute of HTML
          var dataAuto = $this.data('auto'),
              dataTiming = $this.data('timing'),
              dataLoop = $this.data('loop'),
              dataControlsPagination = $this.data('controls-pagination'),
              dataControlsArrows = $this.data('controls-arrows'),
              dataDraggable = $this.data('draggable'),
              dataDraggableCursor = $this.data('draggable-cursor'),
              dataCountTotal = $this.data('count-total'),
              dataCountCur = $this.data('count-now');
          if (basic_typeof(dataAuto) === ( true ? "undefined" : undefined)) dataAuto = false;
          if (basic_typeof(dataTiming) === ( true ? "undefined" : undefined)) dataTiming = 10000;
          if (basic_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = false;
          if (basic_typeof(dataControlsPagination) === ( true ? "undefined" : undefined)) dataControlsPagination = '.uix-advanced-slider__pagination';
          if (basic_typeof(dataControlsArrows) === ( true ? "undefined" : undefined) || dataControlsArrows == false) dataControlsArrows = '.uix-advanced-slider__arrows';
          if (basic_typeof(dataDraggable) === ( true ? "undefined" : undefined)) dataDraggable = false;
          if (basic_typeof(dataDraggableCursor) === ( true ? "undefined" : undefined) || dataDraggableCursor == false) dataDraggableCursor = 'move';
          if (basic_typeof(dataCountTotal) === ( true ? "undefined" : undefined)) dataCountTotal = 'p.count em.count';
          if (basic_typeof(dataCountCur) === ( true ? "undefined" : undefined)) dataCountCur = 'p.count em.current'; //Autoplay times

          var playTimes; //A function called "timer" once every second (like a digital watch).

          $this[0].animatedSlides;
          animDelay = UixCssProperty.getTransitionDuration($first[0]); //Initialize the first item container
          //-------------------------------------		

          $items.addClass('next');
          setTimeout(function () {
            $first.addClass('is-active');
          }, animDelay);

          if ($first.find('video').length > 0) {
            //Returns the dimensions (intrinsic height and width ) of the video
            var video = document.getElementById($first.find('video').attr('id'));
            var videoURL = $first.find('source:first').attr('src');
            if (basic_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = $first.attr('src');
            video.addEventListener('loadedmetadata', function (e) {
              $this.css('height', this.videoHeight * ($this.width() / this.videoWidth) + 'px');
              nativeItemW = this.videoWidth;
              nativeItemH = this.videoHeight; //Initialize all the items to the stage

              addItemsToStage($this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur);
            }, false);
            video.src = videoURL;
          } else {
            var imgURL = $first.find('img').attr('src');

            if (basic_typeof(imgURL) != ( true ? "undefined" : undefined)) {
              var img = new Image();

              img.onload = function () {
                $this.css('height', $this.width() * (this.height / this.width) + 'px');
                nativeItemW = this.width;
                nativeItemH = this.height; //Initialize all the items to the stage

                addItemsToStage($this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur);
              };

              img.src = imgURL;
            }
          } //Autoplay Slider
          //-------------------------------------		


          if (!resize) {
            if (dataAuto && !isNaN(parseFloat(dataTiming)) && isFinite(dataTiming)) {
              sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              $this.on({
                mouseenter: function mouseenter() {
                  clearInterval($this[0].animatedSlides);
                },
                mouseleave: function mouseleave() {
                  sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
                }
              });
            }
          } //Prevents front-end javascripts that are activated with AJAX to repeat loading.


          $this.data('activated', 1);
        } //endif activated

      });
    }
    /*
    * Trigger slider autoplay
    *
    * @param  {Function} playTimes            - Number of times.
    * @param  {Number} timing                 - Autoplay interval.
    * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
    * @param  {Element} slider                 - Selector of the slider .
     * @param  {String} countTotalID           - Total number ID or class of counter.
     * @param  {String} countCurID             - Current number ID or class of counter.
     * @param  {String} paginationID           - Navigation ID for paging control of each slide.
     * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
    * @return {Void}                          - The constructor.
    */


    function sliderAutoPlay(playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID) {
      var items = slider.find('.uix-advanced-slider__item'),
          total = items.length;
      slider[0].animatedSlides = setInterval(function () {
        playTimes = parseFloat(items.filter('.is-active').index());
        playTimes++;

        if (!loop) {
          if (playTimes < total && playTimes >= 0) sliderUpdates(playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
        } else {
          if (playTimes == total) playTimes = 0;
          if (playTimes < 0) playTimes = total - 1;
          sliderUpdates(playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
        }
      }, timing);
    }
    /*
    * Initialize all the items to the stage
    *
    * @param  {Element} slider                 - Current selector of each slider.
    * @param  {Number} nativeItemW            - Returns the intrinsic width of the image/video.
    * @param  {Number} nativeItemH            - Returns the intrinsic height of the image/video.
     * @param  {String} paginationID           - Navigation ID for paging control of each slide.
     * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
     * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop. 
     * @param  {Boolean} draggable             - Allow drag and drop on the slider.
     * @param  {String} draggableCursor        - Drag & Drop Change icon/cursor while dragging.
     * @param  {String} countTotalID           - Total number ID or class of counter.
     * @param  {String} countCurID             - Current number ID or class of counter.
    * @return {Void}
    */


    function addItemsToStage(slider, nativeItemW, nativeItemH, paginationID, arrowsID, loop, draggable, draggableCursor, countTotalID, countCurID) {
      var $this = slider,
          $items = $this.find('.uix-advanced-slider__item'),
          $first = $items.first(),
          itemsTotal = $items.length; //If arrows does not exist on the page, it will be added by default, 
      //and the drag and drop function will be activated.

      if ($(arrowsID).length == 0) {
        $('body').prepend('<div style="display:none;" class="uix-advanced-slider__arrows ' + arrowsID.replace('#', '').replace('.', '') + '"><a href="#" class="uix-advanced-slider__arrows--prev"></a><a href="#" class="uix-advanced-slider__arrows--next"></a></div>');
      } //Add identifiers for the first and last items


      $items.last().addClass('last');
      $items.first().addClass('first'); //Prevent bubbling

      if (itemsTotal == 1) {
        $(paginationID).hide();
        $(arrowsID).hide();
      } // Fires local videos asynchronously with slider switch.
      //-------------------------------------


      normalSliderVideoInit($items, false); //Pagination dots 
      //-------------------------------------	

      var _dot = '',
          _dotActive = '';
      _dot += '<ul>';

      for (var i = 0; i < itemsTotal; i++) {
        _dotActive = i == 0 ? 'class="is-active"' : '';
        _dot += '<li><a ' + _dotActive + ' data-index="' + i + '" href="javascript:"></a></li>';
      }

      _dot += '</ul>';
      if ($(paginationID).html() == '') $(paginationID).html(_dot);
      $(paginationID).find('li a').off('click').on('click', function (e) {
        e.preventDefault(); //Prevent buttons' events from firing multiple times

        var $btn = $(this);
        if ($btn.attr('aria-disabled') == 'true') return false;
        $(paginationID).find('li a').attr('aria-disabled', 'true');
        setTimeout(function () {
          $(paginationID).find('li a').attr('aria-disabled', 'false');
        }, animDelay);

        if (!$(this).hasClass('is-active')) {
          //Determine the direction
          var curDir = 'prev';

          if ($(this).attr('data-index') > parseFloat($items.filter('.is-active').index())) {
            curDir = 'next';
          }

          sliderUpdates($(this).attr('data-index'), $this, curDir, countTotalID, countCurID, paginationID, arrowsID, loop); //Pause the auto play event

          clearInterval($this[0].animatedSlides);
        }
      }); //Next/Prev buttons
      //-------------------------------------		

      var _prev = $(arrowsID).find('.uix-advanced-slider__arrows--prev'),
          _next = $(arrowsID).find('.uix-advanced-slider__arrows--next');

      $(arrowsID).find('a').attr('href', 'javascript:');
      $(arrowsID).find('a').removeClass('is-disabled');

      if (!loop) {
        _prev.addClass('is-disabled');
      }

      _prev.off('click').on('click', function (e) {
        e.preventDefault(); //Prevent buttons' events from firing multiple times

        if (_prev.attr('aria-disabled') == 'true') return false;

        _prev.attr('aria-disabled', 'true');

        setTimeout(function () {
          _prev.attr('aria-disabled', 'false');
        }, animDelay);
        sliderUpdates(parseFloat($items.filter('.is-active').index()) - 1, $this, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop); //Pause the auto play event

        clearInterval($this[0].animatedSlides);
      });

      _next.off('click').on('click', function (e) {
        e.preventDefault(); //Prevent buttons' events from firing multiple times

        if (_next.attr('aria-disabled') == 'true') return false;

        _next.attr('aria-disabled', 'true');

        setTimeout(function () {
          _next.attr('aria-disabled', 'false');
        }, animDelay);
        sliderUpdates(parseFloat($items.filter('.is-active').index()) + 1, $this, 'next', countTotalID, countCurID, paginationID, arrowsID, loop); //Pause the auto play event

        clearInterval($this[0].animatedSlides);
      }); //Added touch method to mobile device and desktop
      //-------------------------------------	


      var $dragDropTrigger = $items; //Make the cursor a move icon when a user hovers over an item

      if (draggable && draggableCursor != '' && draggableCursor != false) $dragDropTrigger.css('cursor', draggableCursor); //Mouse event

      $dragDropTrigger.on('mousedown.ADVANCED_SLIDER touchstart.ADVANCED_SLIDER', function (e) {
        //Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android
        var touches = e.originalEvent.touches;
        $(this).addClass('is-dragging');

        if (touches && touches.length) {
          $(this).data('origin_mouse_x', parseInt(touches[0].pageX));
          $(this).data('origin_mouse_y', parseInt(touches[0].pageY));
        } else {
          if (draggable) {
            $(this).data('origin_mouse_x', parseInt(e.pageX));
            $(this).data('origin_mouse_y', parseInt(e.pageY));
          }
        }

        $dragDropTrigger.on('mouseup.ADVANCED_SLIDER touchmove.ADVANCED_SLIDER', function (e) {
          $(this).removeClass('is-dragging');
          var touches = e.originalEvent.touches,
              origin_mouse_x = $(this).data('origin_mouse_x'),
              origin_mouse_y = $(this).data('origin_mouse_y');

          if (touches && touches.length) {
            var deltaX = origin_mouse_x - touches[0].pageX,
                deltaY = origin_mouse_y - touches[0].pageY; //--- left

            if (deltaX >= 50) {
              if ($items.filter('.is-active').index() < itemsTotal - 1) _next.trigger('click');
            } //--- right


            if (deltaX <= -50) {
              if ($items.filter('.is-active').index() > 0) _prev.trigger('click');
            } //--- up


            if (deltaY >= 50) {} //--- down


            if (deltaY <= -50) {}

            if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
              $dragDropTrigger.off('touchmove.ADVANCED_SLIDER');
            }
          } else {
            if (draggable) {
              //right
              if (e.pageX > origin_mouse_x) {
                if ($items.filter('.is-active').index() > 0) _prev.trigger('click');
              } //left


              if (e.pageX < origin_mouse_x) {
                if ($items.filter('.is-active').index() < itemsTotal - 1) _next.trigger('click');
              } //down


              if (e.pageY > origin_mouse_y) {} //up


              if (e.pageY < origin_mouse_y) {}

              $dragDropTrigger.off('mouseup.ADVANCED_SLIDER');
            }
          }
        }); //end: mouseup.ADVANCED_SLIDER touchmove.ADVANCED_SLIDER
      }); // end: mousedown.ADVANCED_SLIDER touchstart.ADVANCED_SLIDER
    }
    /*
     * Transition Between Slides
     *
     * @param  {Number} elementIndex           - Index of current slider.
     * @param  {Element} slider                 - Selector of the slider .
     * @param  {String} dir                    - Switching direction indicator.
           * @param  {String} countTotalID           - Total number ID or class of counter.
           * @param  {String} countCurID             - Current number ID or class of counter.
           * @param  {String} paginationID           - Navigation ID for paging control of each slide.
           * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
           * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
     * @return {Void}
     */


    function sliderUpdates(elementIndex, slider, dir, countTotalID, countCurID, paginationID, arrowsID, loop) {
      var $items = slider.find('.uix-advanced-slider__item'),
          $current = $items.eq(elementIndex),
          total = $items.length; //Prevent bubbling

      if (total == 1) {
        $(paginationID).hide();
        $(arrowsID).hide();
        return false;
      } //Transition Interception
      //-------------------------------------


      if (loop) {
        if (elementIndex == total) elementIndex = 0;
        if (elementIndex < 0) elementIndex = total - 1;
      } else {
        $(arrowsID).find('a').removeClass('is-disabled');
        if (elementIndex == total - 1) $(arrowsID).find('.uix-advanced-slider__arrows--next').addClass('is-disabled');
        if (elementIndex == 0) $(arrowsID).find('.uix-advanced-slider__arrows--prev').addClass('is-disabled');
      } // To determine if it is a touch screen.


      if (Modernizr.touchevents) {
        if (elementIndex == total) elementIndex = total - 1;
        if (elementIndex < 0) elementIndex = 0; //Prevent bubbling

        if (!loop) {
          //first item
          if (elementIndex == 0) {
            $(arrowsID).find('.uix-advanced-slider__arrows--prev').addClass('is-disabled');
          } //last item


          if (elementIndex == total - 1) {
            $(arrowsID).find('.uix-advanced-slider__arrows--next').addClass('is-disabled');
          }
        }
      } //Determine the direction and add class to switching direction indicator.


      var dirIndicatorClass = '';
      if (dir == 'prev') dirIndicatorClass = 'prev';
      if (dir == 'next') dirIndicatorClass = 'next'; //Add transition class to Controls Pagination

      $(paginationID).find('li a').removeClass('leave');
      $(paginationID).find('li a.is-active').removeClass('is-active').addClass('leave');
      $(paginationID).find('li a[data-index="' + elementIndex + '"]').addClass('is-active').removeClass('leave'); //Add transition class to each item

      $items.removeClass('leave prev next');
      $items.addClass(dirIndicatorClass);
      slider.find('.uix-advanced-slider__item.is-active').removeClass('is-active').addClass('leave ' + dirIndicatorClass);
      $items.eq(elementIndex).addClass('is-active ' + dirIndicatorClass).removeClass('leave'); //Display counter
      //-------------------------------------

      $(countTotalID).text(total);
      $(countCurID).text(parseFloat(elementIndex) + 1); // Fires local videos asynchronously with slider switch.
      //-------------------------------------

      normalSliderVideoInit($items, false);
      normalSliderVideoInit($current, true); //Reset the default height of item
      //-------------------------------------	

      itemDefaultInit(slider, $current);
    }
    /*
     * Initialize the default height of item
     *
           * @param  {Element} slider                 - Selector of the slider .
     * @param  {Element} currentLlement         - Current selector of each slider.
     * @return {Void}
     */


    function itemDefaultInit(slider, currentLlement) {
      if (currentLlement.find('video').length > 0) {
        //Returns the dimensions (intrinsic height and width ) of the video
        var video = document.getElementById(currentLlement.find('video').attr('id'));
        var videoURL = currentLlement.find('source:first').attr('src');
        if (basic_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = currentLlement.attr('src');
        video.addEventListener('loadedmetadata', function (e) {
          slider.css('height', this.videoHeight * (currentLlement.closest('.uix-advanced-slider__outline').width() / this.videoWidth) + 'px');
        }, false);
        video.src = videoURL;
      } else {
        var imgURL = currentLlement.find('img').attr('src');

        if (basic_typeof(imgURL) != ( true ? "undefined" : undefined)) {
          var img = new Image();

          img.onload = function () {
            slider.css('height', currentLlement.closest('.uix-advanced-slider__outline').width() * (this.height / this.width) + 'px');
          };

          img.src = imgURL;
        }
      }
    }
    /*
     * Initialize embedded local video.
     *
     * @param  {Element} wrapper          - The outermost video container, which can contain multiple videos
     * @param  {Boolean} play            - Forced to trigger pause or play events.
     * @return {Void}
     */


    function normalSliderVideoInit(wrapper, play) {
      wrapper.find('.uix-video__slider').each(function () {
        var $this = $(this);
        var videoWrapperW = $this.closest('.uix-advanced-slider__outline').width(),
            curVideoID = $this.find('video').attr('id') + '-slider-videopush',
            coverPlayBtnID = 'videocover-' + curVideoID,
            $replayBtn = $('#' + curVideoID + '-replay-btn');
        var dataControls = $this.data('embed-video-controls'),
            dataAuto = $this.data('embed-video-autoplay'),
            dataLoop = $this.data('embed-video-loop'),
            dataW = $this.data('embed-video-width'),
            dataH = $this.data('embed-video-height'); //Push a new ID to video
        //Solve the problem that ajax asynchronous loading does not play

        $this.find('.video-js').attr('id', curVideoID);

        if (basic_typeof(dataAuto) === ( true ? "undefined" : undefined)) {
          dataAuto = true;
        }

        if (basic_typeof(dataLoop) === ( true ? "undefined" : undefined)) {
          dataLoop = true;
        }

        if (basic_typeof(dataControls) === ( true ? "undefined" : undefined)) {
          dataControls = false;
        }

        if (basic_typeof(dataW) === ( true ? "undefined" : undefined) || dataW == 'auto') {
          dataW = videoWrapperW;
        }

        if (basic_typeof(dataH) === ( true ? "undefined" : undefined) || dataH == 'auto') {
          dataH = videoWrapperW / 1.77777777777778;
        } //Display cover and play buttons when some mobile device browsers cannot automatically play video


        if ($('#' + coverPlayBtnID).length == 0) {
          $('<div id="' + coverPlayBtnID + '" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url(' + $this.find('video').attr('poster') + ')"></span><span class="uix-video__cover__playbtn"></span></div>').insertBefore($this);
          var btnEv = Modernizr.touchevents ? 'touchstart' : 'click';
          $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').on(btnEv, function (e) {
            e.preventDefault();
            myPlayer.play();
            $('#' + coverPlayBtnID).hide();
          });
        } //Add replay button to video 


        if ($replayBtn.length == 0) {
          $this.after('<span class="uix-video__btn-play" id="' + curVideoID + '-replay-btn"></span>');
        } //HTML5 video autoplay on mobile revisited


        if (dataAuto && windowWidth <= 768) {
          $this.find('.video-js').attr({
            'autoplay': 'true',
            'muted': 'true',
            'playsinline': 'true'
          });
        }

        var myPlayer = videojs(curVideoID, {
          width: dataW,
          height: dataH,
          loop: dataLoop,
          autoplay: dataAuto
        }, function onPlayerReady() {
          var initVideo = function initVideo(obj) {
            //Get Video Dimensions
            var curW = obj.videoWidth(),
                curH = obj.videoHeight(),
                newW = curW,
                newH = curH;
            newW = videoWrapperW; //Scaled/Proportional Content 

            newH = curH * (newW / curW);

            if (!isNaN(newW) && !isNaN(newH)) {
              obj.height(newH);
              obj.width(newW);
              $this.css('height', newH);
            } //Show this video wrapper


            $this.css('visibility', 'visible'); //Hide loading effect

            $this.find('.vjs-loading-spinner, .vjs-big-play-button').hide();
          };
          /* ---------  Video initialize */


          this.on('loadedmetadata', function () {
            initVideo(this);
          });
          /* ---------  Display the play button  */

          if (!dataAuto) $this.find('.vjs-big-play-button').show();
          $this.find('.vjs-big-play-button').off('click').on('click', function () {
            $(this).hide();
          });
          /* ---------  Set, tell the player it's in fullscreen  */

          if (dataAuto) {
            //Fix an error of Video auto play is not working in browser
            this.muted(true); //Prevent autoplay error: Uncaught (in promise) DOMException

            var promise = this.play();

            if (promise !== undefined) {
              promise.then(function () {// Autoplay started!
              })["catch"](function (error) {
                // Autoplay was prevented.
                $('#' + coverPlayBtnID).show();
                $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                console.log('Autoplay was prevented.');
              });
            }
          }
          /* ---------  Disable control bar play button click */


          if (!dataControls) {
            this.controls(false);
          }
          /* ---------  Determine if the video is auto played from mobile devices  */


          var autoPlayOK = false;
          this.on('timeupdate', function () {
            var duration = this.duration();

            if (duration > 0) {
              autoPlayOK = true;

              if (this.currentTime() > 0) {
                autoPlayOK = true;
                this.off('timeupdate'); //Hide cover and play buttons when the video automatically played

                $('#' + coverPlayBtnID).hide();
              }
            }
          });
          /* ---------  Pause the video when it is not current slider  */

          if (!play) {
            this.pause();
            this.currentTime(0);
          } else {
            //Unmute, because there is interaction, you can turn on the audio.
            this.muted(false);

            if (dataAuto) {
              this.currentTime(0); //Prevent autoplay error: Uncaught (in promise) DOMException

              var _promise = this.play();

              if (_promise !== undefined) {
                _promise.then(function () {// Autoplay started!
                })["catch"](function (error) {
                  // Autoplay was prevented.
                  $('#' + coverPlayBtnID).show();
                  $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                  console.log('Autoplay was prevented.');
                });
              } //Hidden replay button


              $replayBtn.hide(); //Should the video go to the beginning when it ends

              this.on('ended', function () {
                if (dataLoop) {
                  this.currentTime(0);
                  this.play();
                } else {
                  //Replay this video
                  this.currentTime(0);
                  $replayBtn.show().off('click').on('click', function (e) {
                    e.preventDefault();
                    this.play();
                    $replayBtn.hide();
                  });
                }
              });
            }
          }
        });
      });
    }
  };

  module.components.pageLoaded.push(module.ADVANCED_SLIDER.pageLoaded);
  return function ADVANCED_SLIDER() {
    basic_classCallCheck(this, ADVANCED_SLIDER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/advanced-slider/scss/_special.scss
var _special = __webpack_require__(10);

// CONCATENATED MODULE: ./src/components/ES6/advanced-slider/js/special.js
function special_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function special_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { special_typeof = function _typeof(obj) { return typeof obj; }; } else { special_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return special_typeof(obj); }

/* 
 *************************************
 * <!-- Advanced Slider (Special Effects) -->
 *************************************
 */

/**
 * module.ADVANCED_SLIDER_FILTER
 * 
 * @requires ./examples/assets/js/min/pixi.min.js
 * @requires ./src/components/ES5/_plugins-GSAP
 */


var ADVANCED_SLIDER_FILTER = function (module, $, window, document) {
  if (window.ADVANCED_SLIDER_FILTER === null) return false;
  module.ADVANCED_SLIDER_FILTER = module.ADVANCED_SLIDER_FILTER || {};
  module.ADVANCED_SLIDER_FILTER.version = '0.2.9';

  module.ADVANCED_SLIDER_FILTER.pageLoaded = function () {
    // Remove pixi.js banner from the console
    PIXI.utils.skipHello();
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var animSpeed = 1000;
    var $sliderWrapper = $('.uix-advanced-slider-sp');
    var //Save different canvas heights as an array
    canvasHeights = [],
        //Basic webGL renderers 
    rendererOuterID = 'uix-advanced-slider-sp__canvas-container',
        rendererCanvasID = 'uix-advanced-slider-sp__canvas',
        renderer,
        //PIXI
    renderer__filter,
        rendererCanvasID__filter = rendererCanvasID,
        stage__filter,
        container__items,
        displacementSprite,
        displacementFilter;
    sliderInit(false);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;
        sliderInit(true);
      }
    });
    /*
     * Initialize slideshow
     *
     * @param  {Boolean} resize            - Determine whether the window size changes.
     * @return {Void}
     */

    function sliderInit(resize) {
      $sliderWrapper.each(function () {
        var $this = $(this);
        var $items = $this.find('.uix-advanced-slider-sp__item'),
            $first = $items.first(),
            activated = $this.data('activated');
        var nativeItemW, nativeItemH;

        if (special_typeof(activated) === ( true ? "undefined" : undefined) || activated === 0) {
          //Get parameter configuration from the data-* attribute of HTML
          var dataAuto = $this.data('auto'),
              dataTiming = $this.data('timing'),
              dataLoop = $this.data('loop'),
              dataControlsPagination = $this.data('controls-pagination'),
              dataControlsArrows = $this.data('controls-arrows'),
              dataDraggable = $this.data('draggable'),
              dataDraggableCursor = $this.data('draggable-cursor'),
              dataCountTotal = $this.data('count-total'),
              dataCountCur = $this.data('count-now'),
              dataSpeed = $this.data('speed'),
              dataFilterTexture = $this.data('filter-texture');
          if (special_typeof(dataAuto) === ( true ? "undefined" : undefined)) dataAuto = false;
          if (special_typeof(dataTiming) === ( true ? "undefined" : undefined)) dataTiming = 10000;
          if (special_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = false;
          if (special_typeof(dataControlsPagination) === ( true ? "undefined" : undefined)) dataControlsPagination = '.uix-advanced-slider-sp__pagination';
          if (special_typeof(dataControlsArrows) === ( true ? "undefined" : undefined) || dataControlsArrows == false) dataControlsArrows = '.uix-advanced-slider-sp__arrows';
          if (special_typeof(dataDraggable) === ( true ? "undefined" : undefined)) dataDraggable = false;
          if (special_typeof(dataDraggableCursor) === ( true ? "undefined" : undefined) || dataDraggableCursor == false) dataDraggableCursor = 'move';
          if (special_typeof(dataCountTotal) === ( true ? "undefined" : undefined)) dataCountTotal = 'p.count em.count';
          if (special_typeof(dataCountCur) === ( true ? "undefined" : undefined)) dataCountCur = 'p.count em.current';
          if (special_typeof(dataFilterTexture) === ( true ? "undefined" : undefined) || !dataFilterTexture || dataFilterTexture == '') dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; //Autoplay times

          var playTimes; //A function called "timer" once every second (like a digital watch).

          $this[0].animatedSlides; //Get the animation speed
          //-------------------------------------	

          if (special_typeof(dataSpeed) != ( true ? "undefined" : undefined) && dataSpeed != false) {
            animSpeed = dataSpeed;
          } //Display all images
          //-------------------------------------	


          if (!Modernizr.webgl) {
            $this.find('img').css('visibility', 'visible');
          } //Initialize the first item container
          //-------------------------------------		


          $items.addClass('next');
          $first.addClass('is-active');
          TweenMax.set($items, {
            alpha: 0,
            onComplete: function onComplete() {
              TweenMax.to($first, animSpeed / 1000, {
                alpha: 1,
                delay: animSpeed / 1000
              });
            }
          });

          if ($first.find('video').length > 0) {
            //Returns the dimensions (intrinsic height and width ) of the video
            var video = document.getElementById($first.find('video').attr('id'));
            var videoURL = $first.find('source:first').attr('src');
            if (special_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = $first.attr('src');

            if (special_typeof(videoURL) != ( true ? "undefined" : undefined)) {
              video.addEventListener('loadedmetadata', function (e) {
                $this.css('height', this.videoHeight * ($this.width() / this.videoWidth) + 'px');
                nativeItemW = this.videoWidth;
                nativeItemH = this.videoHeight; //Initialize all the items to the stage

                addItemsToStage($this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur, dataFilterTexture);
              }, false);
              video.src = videoURL;
            }
          } else {
            var imgURL = $first.find('img').attr('src');

            if (special_typeof(imgURL) != ( true ? "undefined" : undefined)) {
              var img = new Image();

              img.onload = function () {
                $this.css('height', $this.width() * (this.height / this.width) + 'px');
                nativeItemW = this.width;
                nativeItemH = this.height; //Initialize all the items to the stage

                addItemsToStage($this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur, dataFilterTexture);
              };

              img.src = imgURL;
            }
          } //Autoplay Slider
          //-------------------------------------		


          if (!resize) {
            if (dataAuto && !isNaN(parseFloat(dataTiming)) && isFinite(dataTiming)) {
              sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              $this.on({
                mouseenter: function mouseenter() {
                  clearInterval($this[0].animatedSlides);
                },
                mouseleave: function mouseleave() {
                  sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
                }
              });
            }
          } //Prevents front-end javascripts that are activated with AJAX to repeat loading.


          $this.data('activated', 1);
        } //endif activated

      });
    }
    /*
    * Trigger slider autoplay
    *
    * @param  {Function} playTimes            - Number of times.
    * @param  {Number} timing                 - Autoplay interval.
    * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
    * @param  {Element} slider                 - Selector of the slider .
    * @param  {String} countTotalID           - Total number ID or class of counter.
    * @param  {String} countCurID             - Current number ID or class of counter.
    * @param  {String} paginationID           - Navigation ID for paging control of each slide.
    * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
    * @return {Void}                          - The constructor.
    */


    function sliderAutoPlay(playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID) {
      var items = slider.find('.uix-advanced-slider-sp__item'),
          total = items.length;
      slider[0].animatedSlides = setInterval(function () {
        playTimes = parseFloat(items.filter('.is-active').index());
        playTimes++;

        if (!loop) {
          if (playTimes < total && playTimes >= 0) sliderUpdates(playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
        } else {
          if (playTimes == total) playTimes = 0;
          if (playTimes < 0) playTimes = total - 1; //Prevent problems with styles when switching in positive order

          if (playTimes == 0) {
            sliderUpdates(playTimes, slider, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop);
          } else {
            sliderUpdates(playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
          }
        }
      }, timing);
    }
    /*
     * Initialize all the items to the stage
     *
     * @param  {Element} slider                 - Current selector of each slider.
     * @param  {Number} nativeItemW            - Returns the intrinsic width of the image/video.
     * @param  {Number} nativeItemH            - Returns the intrinsic height of the image/video.
           * @param  {String} paginationID           - Navigation ID for paging control of each slide.
           * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
           * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop. 
           * @param  {Boolean} draggable             - Allow drag and drop on the slider.
           * @param  {String} draggableCursor        - Drag & Drop Change icon/cursor while dragging.
           * @param  {String} countTotalID           - Total number ID or class of counter.
           * @param  {String} countCurID             - Current number ID or class of counter.
           * @param  {String} filterTexture          - The texture used for the displacement map.
     * @return {Void}
     */


    function addItemsToStage(slider, nativeItemW, nativeItemH, paginationID, arrowsID, loop, draggable, draggableCursor, countTotalID, countCurID, filterTexture) {
      var $this = slider,
          $items = $this.find('.uix-advanced-slider-sp__item'),
          $first = $items.first(),
          itemsTotal = $items.length; //If arrows does not exist on the page, it will be added by default, 
      //and the drag and drop function will be activated.

      if ($(arrowsID).length == 0) {
        $('body').prepend('<div style="display:none;" class="uix-advanced-slider-sp__arrows ' + arrowsID.replace('#', '').replace('.', '') + '"><a href="#" class="uix-advanced-slider-sp__arrows--prev"></a><a href="#" class="uix-advanced-slider-sp__arrows--next"></a></div>');
      } //Add identifiers for the first and last items


      $items.last().addClass('last');
      $items.first().addClass('first'); //Prevent bubbling

      if (itemsTotal == 1) {
        $(paginationID).hide();
        $(arrowsID).hide();
      }

      if (Modernizr.webgl) {
        //Load slides to canvas
        //-------------------------------------	
        if ($('#' + rendererCanvasID).length == 0) {
          $this.prepend('<div id="' + rendererOuterID + '" class="uix-advanced-slider-sp__canvas-container"><canvas id="' + rendererCanvasID + '"></canvas></div>');
        } //Save different canvas heights as an array
        //-------------------------------------	


        $this.find('.uix-advanced-slider-sp__item').each(function (index) {
          var $thisItem = $(this);

          if ($thisItem.find('video').length > 0) {
            //Returns the dimensions (intrinsic height and width ) of the video
            var video = document.getElementById($thisItem.find('video').attr('id'));
            var videoURL = $thisItem.find('video source:first').attr('src');
            if (special_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = $thisItem.attr('src');
            video.addEventListener('loadedmetadata', function (e) {
              var curW = this.videoWidth,
                  curH = this.videoHeight,
                  newW = curW,
                  newH = curH;
              newW = $this.width(); //Scaled/Proportional Content 

              newH = curH * (newW / curW); //Save different canvas heights as an array

              if (canvasHeights.length < itemsTotal) {
                canvasHeights.push(newH);
              }
            }, false);
            video.src = videoURL;
          } else {
            var imgURL = $thisItem.find('img').attr('src'),
                imgCur = new Image();

            imgCur.onload = function () {
              var curW_img = this.width,
                  curH_img = this.height,
                  newW_img = curW_img,
                  newH_img = curH_img;
              newW_img = $this.width(); //Scaled/Proportional Content 

              newH_img = curH_img * (newW_img / curW_img); //Save different canvas heights as an array

              if (canvasHeights.length < itemsTotal) {
                canvasHeights.push(newH_img);
              }
            };

            imgCur.src = imgURL;
          }
        }); //$this.find( '.uix-advanced-slider-sp__item' ).each
        //Basic webGL renderers 
        //-------------------------------------

        renderer = new PIXI.Application({
          width: $this.width(),
          height: $this.height(),
          transparent: true,
          antialias: true,
          autoResize: true,
          view: document.getElementById(rendererCanvasID)
        });
        renderer__filter = new PIXI.autoDetectRenderer({
          width: $this.width(),
          height: $this.height(),
          transparent: true,
          view: document.getElementById(rendererCanvasID__filter)
        }); //
        //

        stage__filter = new PIXI.Container();
        container__items = new PIXI.Container();
        displacementSprite = /^.*\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)/.test(filterTexture) ? new PIXI.Sprite(PIXI.Texture.from(filterTexture)) : new PIXI.Sprite.from(filterTexture);
        displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite); //----------------------------------------------------------------------------------
        //--------------------------------- Brightness Effect -------------------------------	
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: renderer.stage.children[index]

        if ($this.hasClass('uix-advanced-slider-sp--eff-brightness')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this); //Load sprite from each slider to canvas
            //-------------------------------------

            var curSprite;

            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if (special_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture); // pause the video

              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true; //Returns the dimensions (intrinsic height and width ) of the video

              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                  imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);

              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };

              imgCur.src = imgURL;
            } // center the sprite's anchor point


            curSprite.anchor.set(0); // sprite size

            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height; //Avoid error texture rendering errors ***!Important***

            TweenMax.set(curSprite, {
              alpha: 0
            }); //Render updated scene
            //-------------------------------------   

            renderer.stage.addChild(curSprite);
          }); //Initialize the default height of canvas
          //-------------------------------------	

          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect
        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect -----------------------
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: container__items.children[index]


        if ($this.hasClass('uix-advanced-slider-sp--eff-liquid')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this); //Load sprite from each slider to canvas
            //-------------------------------------

            var curSprite,
                canvasRatio = $this.width() / nativeItemW;

            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if (special_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture); // pause the video

              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true; //Returns the dimensions (intrinsic height and width ) of the video

              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                  imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);

              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };

              imgCur.src = imgURL;
            } // center the sprite's anchor point


            curSprite.anchor.set(0); // sprite size

            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height; //Need to scale according to the screen

            curSprite.scale.set(canvasRatio); //Render updated scene
            //-------------------------------------   

            container__items.addChild(curSprite); //Add child container to the main container 
            //-------------------------------------

            stage__filter.addChild(container__items); // Enable Interactions

            stage__filter.interactive = true; //Set the filter to stage and set some default values for the animation
            //-------------------------------------
            //A texture stores the information that represents an image

            displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            stage__filter.filters = [displacementFilter]; //Add filter container to the main container
            //-------------------------------------				

            displacementSprite.anchor.set(0.5);
            displacementSprite.x = renderer__filter.width / 2;
            displacementSprite.y = renderer__filter.height / 2;
            displacementSprite.scale.x = 1;
            displacementSprite.scale.y = 1; // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass

            displacementFilter.autoFit = false;
            stage__filter.addChild(displacementSprite); //Animation Effects
            //-------------------------------------

            var ticker = new PIXI.Ticker();
            ticker.autoStart = true;
            ticker.add(function (delta) {
              // Render updated scene
              renderer__filter.render(stage__filter);
            });
          }); //Initialize the default height of canvas
          //-------------------------------------	

          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect
        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect 2 -----------------------
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: container__items.children[index]


        if ($this.hasClass('uix-advanced-slider-sp--eff-liquid2')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this); //Load sprite from each slider to canvas
            //-------------------------------------

            var curSprite,
                canvasRatio = $this.width() / nativeItemW;

            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if (special_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture); // pause the video

              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true; //Returns the dimensions (intrinsic height and width ) of the video

              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                  imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);

              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };

              imgCur.src = imgURL;
            } // center the sprite's anchor point


            curSprite.anchor.set(0); // sprite size

            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height; //Need to scale according to the screen

            curSprite.scale.set(canvasRatio); //Avoid error texture rendering errors ***!Important***

            TweenMax.set(curSprite, {
              alpha: 0
            }); //Render updated scene
            //-------------------------------------   

            container__items.addChild(curSprite); //Add child container to the main container 
            //-------------------------------------

            stage__filter.addChild(container__items); // Enable Interactions

            stage__filter.interactive = true; //Set the filter to stage and set some default values for the animation
            //-------------------------------------
            //A texture stores the information that represents an image

            displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP;
            stage__filter.filters = [displacementFilter]; //Add filter container to the main container
            //-------------------------------------				

            displacementSprite.anchor.set(0.5);
            displacementSprite.x = renderer__filter.width / 2;
            displacementSprite.y = renderer__filter.height / 2; // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass

            displacementFilter.autoFit = false;
            stage__filter.addChild(displacementSprite); //Animation Effects
            //-------------------------------------

            var ticker = new PIXI.Ticker();
            ticker.autoStart = true;
            ticker.add(function (delta) {
              // Render updated scene
              renderer__filter.render(stage__filter);
            });
          }); //Initialize the default height of canvas
          //-------------------------------------	

          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect
        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect 3 -----------------------
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: container__items.children[index]


        if ($this.hasClass('uix-advanced-slider-sp--eff-liquid3')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this); //Load sprite from each slider to canvas
            //-------------------------------------

            var curSprite,
                canvasRatio = $this.width() / nativeItemW;

            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if (special_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture); // pause the video

              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true; //Returns the dimensions (intrinsic height and width ) of the video

              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                  imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);

              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };

              imgCur.src = imgURL;
            } // center the sprite's anchor point


            curSprite.anchor.set(0); // sprite size

            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height; //Need to scale according to the screen

            curSprite.scale.set(canvasRatio); //Avoid error texture rendering errors ***!Important***

            TweenMax.set(curSprite, {
              alpha: 0
            }); //Render updated scene
            //-------------------------------------   

            container__items.addChild(curSprite); //Add child container to the main container 
            //-------------------------------------

            stage__filter.addChild(container__items); // Enable Interactions

            stage__filter.interactive = true; //Set the filter to stage and set some default values for the animation
            //-------------------------------------
            //A texture stores the information that represents an image

            displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            stage__filter.filters = [displacementFilter]; //Add filter container to the main container
            //-------------------------------------				

            displacementSprite.anchor.set(0.5);
            displacementSprite.x = renderer__filter.width / 2;
            displacementSprite.y = renderer__filter.height / 2; // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass

            displacementFilter.autoFit = false;
            stage__filter.addChild(displacementSprite); //Animation Effects
            //-------------------------------------

            var ticker = new PIXI.Ticker();
            ticker.autoStart = true;
            ticker.add(function (delta) {
              //Need the displacementSprite.texture.baseTexture.wrapMode is "PIXI.WRAP_MODES.REPEAT"
              displacementSprite.x += 1 * delta;
              displacementSprite.y += 0.3; // Render updated scene

              renderer__filter.render(stage__filter);
            });
          }); //Initialize the default height of canvas
          //-------------------------------------	

          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect
        //----------------------------------------------------------------------------------
        //--------------------------------- Parallax Effect -------------------------------
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: container__items.children[index]


        if ($this.hasClass('uix-advanced-slider-sp--eff-parallax')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this); //Load sprite from each slider to canvas
            //-------------------------------------

            var curSprite,
                canvasRatio = $this.width() / nativeItemW;

            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if (special_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture); // pause the video

              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true; //Returns the dimensions (intrinsic height and width ) of the video

              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                  imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);

              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };

              imgCur.src = imgURL;
            } // center the sprite's anchor point


            curSprite.anchor.set(0); // sprite size

            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height; //Need to scale according to the screen

            curSprite.scale.set(canvasRatio); //Avoid error texture rendering errors ***!Important***

            TweenMax.set(curSprite, {
              alpha: 0
            }); //Render updated scene
            //-------------------------------------   

            container__items.addChild(curSprite); //Add child container to the main container 
            //-------------------------------------

            stage__filter.addChild(container__items); // Enable Interactions

            stage__filter.interactive = true; // Create mask
            //-------------------------------------
            //current mask

            var curSpriteMask = new PIXI.Graphics();
            curSpriteMask.lineStyle(0);
            curSpriteMask.beginFill(0xFFFFFF);
            curSpriteMask.moveTo(0, 0);
            curSpriteMask.lineTo(renderer.view.width, 0);
            curSpriteMask.lineTo(renderer.view.width, renderer.view.height);
            curSpriteMask.lineTo(0, renderer.view.height);
            curSpriteMask.endFill();
            curSpriteMask.position.x = 0;
            curSpriteMask.position.y = 0;
            curSprite.mask = curSpriteMask;
            stage__filter.addChild(curSpriteMask); //Do not add to the container
            //Animation Effects
            //-------------------------------------

            var ticker = new PIXI.Ticker();
            ticker.autoStart = true;
            ticker.add(function (delta) {
              // Render updated scene
              renderer__filter.render(stage__filter);
            });
          }); //Initialize the default height of canvas
          //-------------------------------------	

          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect
        //Canvas Interactions
        //-------------------------------------


        transitionInteractions(0, itemsTotal - 1, $this, 'in', 'next');
      } // Fires local videos asynchronously with slider switch.
      //-------------------------------------


      if (!Modernizr.webgl) normalSliderVideoInit($items, false); //Pagination dots 
      //-------------------------------------	

      var _dot = '',
          _dotActive = '';
      _dot += '<ul>';

      for (var i = 0; i < itemsTotal; i++) {
        _dotActive = i == 0 ? 'class="is-active"' : '';
        _dot += '<li><a ' + _dotActive + ' data-index="' + i + '" href="javascript:"></a></li>';
      }

      _dot += '</ul>';
      if ($(paginationID).html() == '') $(paginationID).html(_dot);
      $(paginationID).find('li a').off('click').on('click', function (e) {
        e.preventDefault(); //Prevent buttons' events from firing multiple times

        var $btn = $(this);
        if ($btn.attr('aria-disabled') == 'true') return false;
        $(paginationID).find('li a').attr('aria-disabled', 'true');
        setTimeout(function () {
          $(paginationID).find('li a').attr('aria-disabled', 'false');
        }, animSpeed);

        if (!$(this).hasClass('is-active')) {
          //Determine the direction
          var curDir = 'prev';

          if ($(this).attr('data-index') > parseFloat($items.filter('.is-active').index())) {
            curDir = 'next';
          } //Canvas Interactions


          transitionInteractions($items.filter('.is-active').index(), $items.filter('.leave').index(), $this, 'out', curDir); //Update the current and previous/next items

          sliderUpdates($(this).attr('data-index'), $this, curDir, countTotalID, countCurID, paginationID, arrowsID, loop); //Pause the auto play event

          clearInterval($this[0].animatedSlides);
        }
      }); //Next/Prev buttons
      //-------------------------------------		

      var _prev = $(arrowsID).find('.uix-advanced-slider-sp__arrows--prev'),
          _next = $(arrowsID).find('.uix-advanced-slider-sp__arrows--next');

      $(arrowsID).find('a').attr('href', 'javascript:');
      $(arrowsID).find('a').removeClass('is-disabled');

      if (!loop) {
        _prev.addClass('is-disabled');
      }

      _prev.off('click').on('click', function (e) {
        e.preventDefault(); //Prevent buttons' events from firing multiple times

        if (_prev.attr('aria-disabled') == 'true') return false;

        _prev.attr('aria-disabled', 'true');

        setTimeout(function () {
          _prev.attr('aria-disabled', 'false');
        }, animSpeed); //Canvas Interactions

        transitionInteractions($items.filter('.is-active').index(), $items.filter('.leave').index(), $this, 'out', 'prev'); //Update the current and previous items

        sliderUpdates(parseFloat($items.filter('.is-active').index()) - 1, $this, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop); //Pause the auto play event

        clearInterval($this[0].animatedSlides);
      });

      _next.off('click').on('click', function (e) {
        e.preventDefault(); //Prevent buttons' events from firing multiple times

        if (_next.attr('aria-disabled') == 'true') return false;

        _next.attr('aria-disabled', 'true');

        setTimeout(function () {
          _next.attr('aria-disabled', 'false');
        }, animSpeed); //Canvas Interactions

        transitionInteractions($items.filter('.is-active').index(), $items.filter('.leave').index(), $this, 'out', 'next'); //Update the current and next items

        sliderUpdates(parseFloat($items.filter('.is-active').index()) + 1, $this, 'next', countTotalID, countCurID, paginationID, arrowsID, loop); //Pause the auto play event

        clearInterval($this[0].animatedSlides);
      }); //Added touch method to mobile device and desktop
      //-------------------------------------	


      var $dragDropTrigger = $items; //Make the cursor a move icon when a user hovers over an item

      if (draggable && draggableCursor != '' && draggableCursor != false) $dragDropTrigger.css('cursor', draggableCursor); //Mouse event

      $dragDropTrigger.on('mousedown.ADVANCED_SLIDER_FILTER touchstart.ADVANCED_SLIDER_FILTER', function (e) {
        //Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android
        var touches = e.originalEvent.touches;
        $(this).addClass('is-dragging');

        if (touches && touches.length) {
          $(this).data('origin_mouse_x', parseInt(touches[0].pageX));
          $(this).data('origin_mouse_y', parseInt(touches[0].pageY));
        } else {
          if (draggable) {
            $(this).data('origin_mouse_x', parseInt(e.pageX));
            $(this).data('origin_mouse_y', parseInt(e.pageY));
          }
        }

        $dragDropTrigger.on('mouseup.ADVANCED_SLIDER_FILTER touchmove.ADVANCED_SLIDER_FILTER', function (e) {
          $(this).removeClass('is-dragging');
          var touches = e.originalEvent.touches,
              origin_mouse_x = $(this).data('origin_mouse_x'),
              origin_mouse_y = $(this).data('origin_mouse_y');

          if (touches && touches.length) {
            var deltaX = origin_mouse_x - touches[0].pageX,
                deltaY = origin_mouse_y - touches[0].pageY; //--- left

            if (deltaX >= 50) {
              if ($items.filter('.is-active').index() < itemsTotal - 1) _next.trigger('click');
            } //--- right


            if (deltaX <= -50) {
              if ($items.filter('.is-active').index() > 0) _prev.trigger('click');
            } //--- up


            if (deltaY >= 50) {} //--- down


            if (deltaY <= -50) {}

            if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
              $dragDropTrigger.off('touchmove.ADVANCED_SLIDER_FILTER');
            }
          } else {
            if (draggable) {
              //right
              if (e.pageX > origin_mouse_x) {
                if ($items.filter('.is-active').index() > 0) _prev.trigger('click');
              } //left


              if (e.pageX < origin_mouse_x) {
                if ($items.filter('.is-active').index() < itemsTotal - 1) _next.trigger('click');
              } //down


              if (e.pageY > origin_mouse_y) {} //up


              if (e.pageY < origin_mouse_y) {}

              $dragDropTrigger.off('mouseup.ADVANCED_SLIDER_FILTER');
            }
          }
        }); //end: mouseup.ADVANCED_SLIDER_FILTER touchmove.ADVANCED_SLIDER_FILTER
      }); // end: mousedown.ADVANCED_SLIDER_FILTER touchstart.ADVANCED_SLIDER_FILTER
    }
    /*
     * Transition Between Slides
     *
     * @param  {Number} elementIndex           - Index of current slider.
     * @param  {Element} slider                 - Selector of the slider .
     * @param  {String} dir                    - Switching direction indicator.
           * @param  {String} countTotalID           - Total number ID or class of counter.
           * @param  {String} countCurID             - Current number ID or class of counter.
           * @param  {String} paginationID           - Navigation ID for paging control of each slide.
           * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
           * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
     * @return {Void}
     */


    function sliderUpdates(elementIndex, slider, dir, countTotalID, countCurID, paginationID, arrowsID, loop) {
      var $items = slider.find('.uix-advanced-slider-sp__item'),
          $current = $items.eq(elementIndex),
          total = $items.length; //Prevent bubbling

      if (total == 1) {
        $(paginationID).hide();
        $(arrowsID).hide();
        return false;
      } //Transition Interception
      //-------------------------------------


      if (loop) {
        if (elementIndex == total) elementIndex = 0;
        if (elementIndex < 0) elementIndex = total - 1;
      } else {
        $(arrowsID).find('a').removeClass('is-disabled');
        if (elementIndex == total - 1) $(arrowsID).find('.uix-advanced-slider-sp__arrows--next').addClass('is-disabled');
        if (elementIndex == 0) $(arrowsID).find('.uix-advanced-slider-sp__arrows--prev').addClass('is-disabled');
      } // To determine if it is a touch screen.
      //-------------------------------------


      if (Modernizr.touchevents) {
        if (elementIndex == total) elementIndex = total - 1;
        if (elementIndex < 0) elementIndex = 0; //Prevent bubbling

        if (!loop) {
          //first item
          if (elementIndex == 0) {
            $(arrowsID).find('.uix-advanced-slider-sp__arrows--prev').addClass('is-disabled');
          } //last item


          if (elementIndex == total - 1) {
            $(arrowsID).find('.uix-advanced-slider-sp__arrows--next').addClass('is-disabled');
          }
        }
      } //Determine the direction and add class to switching direction indicator.
      //-------------------------------------


      var dirIndicatorClass = '';
      if (dir == 'prev') dirIndicatorClass = 'prev';
      if (dir == 'next') dirIndicatorClass = 'next'; //Add transition class to Controls Pagination
      //-------------------------------------

      $(paginationID).find('li a').removeClass('leave');
      $(paginationID).find('li a.is-active').removeClass('is-active').addClass('leave');
      $(paginationID).find('li a[data-index="' + elementIndex + '"]').addClass('is-active').removeClass('leave'); //Add transition class to each item
      //-------------------------------------	

      $items.removeClass('leave prev next');
      $items.addClass(dirIndicatorClass);
      slider.find('.uix-advanced-slider-sp__item.is-active').removeClass('is-active').addClass('leave ' + dirIndicatorClass);
      $items.eq(elementIndex).addClass('is-active ' + dirIndicatorClass).removeClass('leave'); //Display counter
      //-------------------------------------

      $(countTotalID).text(total);
      $(countCurID).text(parseFloat(elementIndex) + 1); // Fires local videos asynchronously with slider switch.
      //-------------------------------------

      if (!Modernizr.webgl) {
        normalSliderVideoInit($items, false);
        normalSliderVideoInit($current, true);
      } //Reset the default height of canvas
      //-------------------------------------	


      setTimeout(function () {
        canvasDefaultInit(slider, $current);
      }, animSpeed); //Canvas Interactions
      //-------------------------------------
      //-- Brightness Effect

      if (slider.hasClass('uix-advanced-slider-sp--eff-brightness')) {} //-- Liquid Distortion Effect


      if (slider.hasClass('uix-advanced-slider-sp--eff-liquid')) {} //-- Liquid Distortion Effect 2


      if (slider.hasClass('uix-advanced-slider-sp--eff-liquid2')) {} //-- Liquid Distortion Effect 3


      if (slider.hasClass('uix-advanced-slider-sp--eff-liquid3')) {} //-- Parallax Effect 


      if (slider.hasClass('uix-advanced-slider-sp--eff-parallax')) {
        if (loop) {
          if (elementIndex == 0) dir = 'prev';
        }
      }

      transitionInteractions(elementIndex, $items.filter('.leave').index(), slider, 'in', dir);
    }
    /*
     * Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
     *
     * @param  {Number} w                - The width that the canvas will be set.
     * @param  {Number} h                - The height that the canvas will be set.
     * @return {Void}
     */


    function fixCanvasTagSize(w, h) {
      TweenMax.to(['#' + rendererCanvasID, '.uix-advanced-slider-sp__wrapper', '.uix-advanced-slider-sp__inner', '.uix-advanced-slider-sp__canvas-container'], animSpeed / 1000, {
        width: w,
        height: h
      });
    }
    /*
     * Initialize the default height of canvas
     *
           * @param  {Element} slider                 - Selector of the slider .
     * @param  {Element} currentLlement         - Current selector of each slider.
     * @return {Void}
     */


    function canvasDefaultInit(slider, currentLlement) {
      if (currentLlement.find('video').length > 0) {
        //Returns the dimensions (intrinsic height and width ) of the video
        var video = document.getElementById(currentLlement.find('video').attr('id'));
        var videoURL = currentLlement.find('source:first').attr('src');
        if (special_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = currentLlement.attr('src');
        video.addEventListener('loadedmetadata', function (e) {
          //At the same time change the height of the canvas and slider container
          var h = this.videoHeight * (currentLlement.closest('.uix-advanced-slider__outline').width() / this.videoWidth);

          if (Modernizr.webgl) {
            renderer.view.style.height = h + 'px';
          } //---


          slider.css('height', h + 'px');
        }, false);
        video.src = videoURL;
      } else {
        var imgURL = currentLlement.find('img').attr('src');

        if (special_typeof(imgURL) != ( true ? "undefined" : undefined)) {
          var img = new Image();

          img.onload = function () {
            if (Modernizr.webgl) {
              renderer.view.style.height = currentLlement.find('img').height() + 'px';
            } //---


            slider.css('height', currentLlement.closest('.uix-advanced-slider__outline').width() * (this.height / this.width) + 'px');
          };

          img.src = imgURL;
        }
      }
    }
    /*
     * Canvas Transition Interactions
     * @http://pixijs.download/dev/docs/index.html
     *
     * @param  {Number} elementIndex           - Index of current slider.
     * @param  {Number} prevElementIndex       - Index of previous slider.
     * @param  {Element} slider                 - Selector of the slider.
     * @param  {String} goType                 - The type of entry and exit between two items.  
                                                 Optional values: in, out
     * @param  {String} dir                    - Switching direction indicator.	 
     * @return {Void}
     */


    function transitionInteractions(elementIndex, prevElementIndex, slider, goType, dir) {
      if (Modernizr.webgl) {
        var $myRenderer = $('#' + rendererOuterID),
            $current = slider.find('.uix-advanced-slider-sp__item').eq(elementIndex),
            $allItems = slider.find('.uix-advanced-slider-sp__item'),
            imgSel = $current.find('img'),
            curImgURL = imgSel.attr('src'),
            stageW = slider.width(),
            stageH = slider.height(),
            spTotal = slider.find('.uix-advanced-slider-sp__item').length;
        elementIndex = parseFloat(elementIndex);
        prevElementIndex = parseFloat(prevElementIndex); //----------------------------------------------------------------------------------
        //--------------------------------- Brightness Effect -------------------------------	
        //----------------------------------------------------------------------------------

        if (slider.hasClass('uix-advanced-slider-sp--eff-brightness')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          }); //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	

          if (goType == 'out') {
            //Current item leaving action
            TweenMax.to(renderer.stage.children[elementIndex], animSpeed / 1000, {
              pixi: {
                brightness: 5
              },
              alpha: 1
            });
          } else {
            //Current item entry action
            TweenMax.to($myRenderer, animSpeed / 1000, {
              alpha: 0,
              onComplete: function onComplete() {
                var curSp = renderer.stage.children[elementIndex];
                TweenMax.to(this.target, animSpeed / 1000, {
                  alpha: 1
                }); //display the current item

                for (var k = 0; k < spTotal; k++) {
                  var obj = renderer.stage.children[k];
                  TweenMax.set(obj, {
                    alpha: 0
                  }); //pause all videos

                  if (obj._texture.baseTexture.imageType == null) {
                    var videoSource = obj.texture.baseTexture.resource.source; // play the video

                    videoSource.currentTime = 0;
                    videoSource.autoplay = false;
                    if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                    videoSource.muted = true;
                  }
                } //play current video


                if (curSp._texture.baseTexture.imageType == null) {
                  var videoSource2 = curSp.texture.baseTexture.resource.source; // play the video

                  videoSource2.currentTime = 0;
                  videoSource2.autoplay = true;
                  if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                  videoSource2.muted = false;
                } //Reset the height of the canvas when each item is switched
                //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
                //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );


                fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]); //display filters

                TweenMax.set(curSp, {
                  pixi: {
                    brightness: 5
                  },
                  alpha: 1,
                  onComplete: function onComplete() {
                    TweenMax.to(this.target, animSpeed / 1000, {
                      pixi: {
                        brightness: 1
                      }
                    });
                    TweenMax.to($current, animSpeed / 1000, {
                      alpha: 1
                    });
                  }
                });
              }
            });
          }
        } // end effect
        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect -----------------------
        //----------------------------------------------------------------------------------


        if (slider.hasClass('uix-advanced-slider-sp--eff-liquid')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          });
          var curSp = container__items.children[elementIndex],
              prevSp = container__items.children[prevElementIndex]; //Display the current item
          //-------------------------------------

          if (!slider.hasClass('js-init-ok')) {
            for (var k = 0; k < spTotal; k++) {
              var obj = container__items.children[k];
              TweenMax.set(obj, {
                alpha: 0
              });
            } //Avoid repeated initialization


            slider.addClass('js-init-ok');
          } //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	


          if (goType == 'out') {//Current item leaving action
          } else {
            //Video sprite initialization
            //Need to ensure that the video tag exists
            setTimeout(function () {
              for (var _k = 0; _k < spTotal; _k++) {
                var _obj = container__items.children[_k]; //pause all videos

                if (_obj._texture.baseTexture.imageType == null) {
                  var videoSource = _obj.texture.baseTexture.resource.source; // play the video

                  videoSource.currentTime = 0;
                  videoSource.autoplay = false;
                  if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                  videoSource.muted = true;
                }
              } //play current video


              if (curSp._texture.baseTexture.imageType == null) {
                var videoSource2 = curSp.texture.baseTexture.resource.source; // play the video

                videoSource2.currentTime = 0;
                videoSource2.autoplay = true;
                if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                videoSource2.muted = false;
              } //Reset the height of the canvas when each item is switched
              //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
              //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );


              fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]);
            }, 100); //Current item entry action

            var baseTimeline = new TimelineMax({
              onComplete: function onComplete() {
                displacementSprite.scale.set(1);
              },
              onUpdate: function onUpdate() {
                displacementSprite.rotation += baseTimeline.progress() * 0.02;
                displacementSprite.scale.set(baseTimeline.progress() * 3);
              }
            });
            baseTimeline.clear();

            if (baseTimeline.isActive()) {
              return;
            }

            baseTimeline.to(displacementFilter.scale, animSpeed / 1000, {
              x: 300,
              y: 300,
              ease: Power1.easeOut
            }).to(prevSp, animSpeed / 2 / 1000, {
              alpha: 0,
              ease: Power2.easeOut
            }, animSpeed / 3 / 1000).to(curSp, animSpeed / 2 / 1000, {
              alpha: 1,
              ease: Power2.easeOut
            }, animSpeed / 2 / 1000).to(displacementFilter.scale, animSpeed / 1000, {
              x: 0,
              y: 0,
              ease: Power2.easeOut
            }, animSpeed / 2 / 1000).to($current, animSpeed / 1000, {
              alpha: 1,
              ease: Power2.easeOut
            }, 'final'); //Add new ripple each time mouse
            //-------------------------------------

            slider[0].addEventListener("mousedown", function (e) {
              TweenMax.to(displacementFilter.scale, 1, {
                x: "+=" + Math.sin(e.pageX) * 100 + "",
                y: "+=" + Math.cos(e.pageY) * 100 + ""
              });
              rotateSpite();
            });
            slider[0].addEventListener("mouseup", function (e) {
              TweenMax.to(displacementFilter.scale, 1, {
                x: 0,
                y: 0
              });
            });

            var rotateSpite = function rotateSpite() {
              displacementFilter.rotation += 0.001;
            };
          }
        } // end effect
        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect 2 -----------------------
        //----------------------------------------------------------------------------------


        if (slider.hasClass('uix-advanced-slider-sp--eff-liquid2')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          }); //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	

          if (goType == 'out') {
            //Current item leaving action
            TweenMax.to(displacementSprite.scale, 1, {
              x: 10
            });
          } else {
            //Current item entry action
            TweenMax.to($myRenderer, animSpeed / 1000, {
              alpha: 0,
              onComplete: function onComplete() {
                var curSp = container__items.children[elementIndex];
                TweenMax.to(this.target, animSpeed / 1000, {
                  alpha: 1
                }); //display the current item

                for (var _k2 = 0; _k2 < spTotal; _k2++) {
                  var _obj2 = container__items.children[_k2];
                  TweenMax.set(_obj2, {
                    alpha: 0
                  }); //pause all videos

                  if (_obj2._texture.baseTexture.imageType == null) {
                    var videoSource = _obj2.texture.baseTexture.resource.source; // play the video

                    videoSource.currentTime = 0;
                    videoSource.autoplay = false;
                    if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                    videoSource.muted = true;
                  }
                } //play current video


                if (curSp._texture.baseTexture.imageType == null) {
                  var videoSource2 = curSp.texture.baseTexture.resource.source; // play the video

                  videoSource2.currentTime = 0;
                  videoSource2.autoplay = true;
                  if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                  videoSource2.muted = false;
                } //Reset the height of the canvas when each item is switched
                //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
                //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );


                fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]); //display filters
                //sprite

                var baseTimeline = new TimelineMax({
                  delay: 0,
                  paused: false,
                  repeat: 0,
                  onRepeat: function onRepeat() {},
                  onComplete: function onComplete() {
                    TweenMax.to(displacementSprite.scale, 1, {
                      x: 1,
                      y: 1
                    });
                    TweenMax.to(displacementSprite, 1, {
                      rotation: 0
                    });
                  },
                  onUpdate: function onUpdate() {
                    displacementSprite.scale.set(baseTimeline.progress() * 13);
                    displacementSprite.rotation += baseTimeline.progress() * 0.02;
                  }
                });
                baseTimeline.clear(); //filter

                baseTimeline.to(displacementFilter.scale, animSpeed / 1000, {
                  y: "+=" + 200 + "",
                  ease: Power3.easeOut
                }).to(curSp, animSpeed / 2 / 1000, {
                  alpha: 1,
                  ease: Power3.easeOut
                }, animSpeed / 2 / 1000).to(displacementFilter.scale, animSpeed / 1000, {
                  y: 0,
                  ease: Power3.easeOut
                }, animSpeed / 2 / 1000).to($current, animSpeed / 1000, {
                  alpha: 1,
                  ease: Power2.easeOut
                }, 'final');
              }
            }); //Add new ripple each time mouse is clicked/mousemoved
            //-------------------------------------

            document.addEventListener("mousemove", function (e) {
              TweenMax.to(displacementFilter.scale, 1, {
                x: e.pageX / 2 + ""
              });
            });
          }
        } // end effect
        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect 3 -----------------------
        //----------------------------------------------------------------------------------


        if (slider.hasClass('uix-advanced-slider-sp--eff-liquid3')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          }); //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	

          if (goType == 'out') {
            //Current item leaving action
            TweenMax.to(displacementSprite, 1, {
              x: 23,
              y: 10
            });
          } else {
            //Current item entry action
            TweenMax.to($myRenderer, animSpeed / 1000, {
              alpha: 0,
              onComplete: function onComplete() {
                var curSp = container__items.children[elementIndex];
                TweenMax.to(this.target, animSpeed / 1000, {
                  alpha: 1
                }); //display the current item

                for (var _k3 = 0; _k3 < spTotal; _k3++) {
                  var _obj3 = container__items.children[_k3];
                  TweenMax.set(_obj3, {
                    alpha: 0
                  }); //pause all videos

                  if (_obj3._texture.baseTexture.imageType == null) {
                    var videoSource = _obj3.texture.baseTexture.resource.source; // play the video

                    videoSource.currentTime = 0;
                    videoSource.autoplay = false;
                    if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                    videoSource.muted = true;
                  }
                } //play current video


                if (curSp._texture.baseTexture.imageType == null) {
                  var videoSource2 = curSp.texture.baseTexture.resource.source; // play the video

                  videoSource2.currentTime = 0;
                  videoSource2.autoplay = true;
                  if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                  videoSource2.muted = false;
                } //Reset the height of the canvas when each item is switched
                //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
                //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );


                fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]); //display filters
                //sprite

                var baseTimeline = new TimelineMax({
                  delay: 0,
                  paused: false,
                  repeat: 0,
                  onRepeat: function onRepeat() {},
                  onComplete: function onComplete() {},
                  onUpdate: function onUpdate() {}
                });
                baseTimeline.clear(); //filter

                baseTimeline.to(displacementFilter.scale, animSpeed / 1000, {
                  y: "+=" + 50 + "",
                  ease: Power3.easeOut
                }).to(curSp, animSpeed / 2 / 1000, {
                  alpha: 1,
                  ease: Power3.easeOut
                }, animSpeed / 2 / 1000).to(displacementFilter.scale, animSpeed / 1000, {
                  y: 0,
                  ease: Power3.easeOut
                }, animSpeed / 2 / 1000).to($current, animSpeed / 1000, {
                  alpha: 1,
                  ease: Power2.easeOut
                }, 'final');
              }
            });
          }
        } // end effect
        //----------------------------------------------------------------------------------
        //--------------------------------- Parallax Effect -----------------------------
        //----------------------------------------------------------------------------------


        if (slider.hasClass('uix-advanced-slider-sp--eff-parallax')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          }); //Prevent text overlap when switching quickly

          $allItems.attr('data-text-eff-enable', 0);
          $current.attr('data-text-eff-enable', 1);
          var curSpParallax = container__items.children[elementIndex],
              prevSpParallax = container__items.children[prevElementIndex]; //Display the current item
          //-------------------------------------

          if (!slider.hasClass('js-init-ok')) {
            for (var m = 0; m < spTotal; m++) {
              var objParallax = container__items.children[m];
              TweenMax.set(objParallax.mask, {
                x: renderer.view.width
              });
            } //Avoid repeated initialization


            slider.addClass('js-init-ok');
          } //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	


          if (goType == 'out') {//Current item leaving action
          } else {
            //Video sprite initialization
            //Need to ensure that the video tag exists
            setTimeout(function () {
              for (var _m = 0; _m < spTotal; _m++) {
                var _obj4 = container__items.children[_m]; //pause all videos

                if (_obj4._texture.baseTexture.imageType == null) {
                  var videoSource = _obj4.texture.baseTexture.resource.source; // play the video

                  videoSource.currentTime = 0;
                  videoSource.autoplay = false;
                  if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                  videoSource.muted = true;
                }
              } //play current video


              if (curSpParallax._texture.baseTexture.imageType == null) {
                var videoSource2 = curSpParallax.texture.baseTexture.resource.source; // play the video

                videoSource2.currentTime = 0;
                videoSource2.autoplay = true;
                if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                videoSource2.muted = false;
              } //Reset the height of the canvas when each item is switched
              //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
              //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );


              fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]);
            }, 100); //Current item entry action

            var restoreX,
                offsetX = renderer.view.width / 6,
                parallaxSpeed = animSpeed / 1000,
                restoreItems = function restoreItems() {
              //restore other items besides the current item
              for (var n = 0; n < spTotal; n++) {
                var _objParallax = container__items.children[n];
                if (elementIndex != n) _objParallax.mask.x = restoreX;
              }
            },
                goNextItem = function goNextItem() {
              // Paralax effect on current slide
              TweenMax.set(curSpParallax, {
                alpha: 1,
                //Avoid error texture rendering errors ***!Important***
                onComplete: function onComplete() {
                  TweenMax.to(this.target, parallaxSpeed, {
                    x: 0,
                    ease: Power2.easeInOut
                  });
                }
              }); // Current Mask animation

              TweenMax.to(curSpParallax.mask, parallaxSpeed, {
                x: 0,
                ease: Power4.easeInOut,
                onComplete: function onComplete() {
                  restoreItems();
                }
              });
              setTimeout(function () {
                //text effect
                if ($.isFunction($.fn.UixTextEff)) {
                  $current.find('[data-text-eff]').each(function (index) {
                    $(document).UixTextEff({
                      selectors: '[data-text-eff="' + $(this).data('text-eff') + '"]',
                      scrollSpy: false
                    });
                  });
                } //Prevent text overlap when switching quickly


                $allItems.each(function () {
                  if ($(this).attr('data-text-eff-enable') == 1) {
                    TweenMax.to($(this), parallaxSpeed, {
                      alpha: 1,
                      delay: parallaxSpeed / 2
                    });
                  } else {
                    TweenMax.to($(this), parallaxSpeed, {
                      alpha: 0,
                      delay: parallaxSpeed / 2
                    });
                  }
                });
              }, parallaxSpeed * 1000 / 2);
            }; // Direction handler


            if (dir == 'next') {
              curSpParallax.x = offsetX;
              curSpParallax.mask.x = renderer.view.width;
              restoreX = renderer.view.width; // Paralax effect on current slide

              TweenMax.to(prevSpParallax, parallaxSpeed, {
                x: -offsetX,
                ease: Power2.easeInOut
              });
            } else {
              curSpParallax.x = -offsetX;
              curSpParallax.mask.x = -(renderer.view.width + curSpParallax.x);
              restoreX = -renderer.view.width; // Paralax effect on previous slide

              TweenMax.to(prevSpParallax, parallaxSpeed, {
                x: offsetX,
                ease: Power2.easeInOut
              }); // Previous Mask animation

              TweenMax.to(prevSpParallax.mask, parallaxSpeed, {
                x: renderer.view.width,
                ease: Power4.easeInOut
              });
            }

            goNextItem();
          }
        } // end effect		

      } else {
        slider.find('.uix-advanced-slider-sp__item canvas').hide();
      }
    }
    /*
     * Initialize embedded local video.
     *
     * @param  {Element} wrapper          - The outermost video container, which can contain multiple videos
     * @param  {Boolean} play            - Forced to trigger pause or play events.
     * @return {Void}
     */


    function normalSliderVideoInit(wrapper, play) {
      wrapper.find('.uix-video__slider').each(function () {
        var $this = $(this);
        var videoWrapperW = $this.closest('.uix-advanced-slider__outline').width(),
            curVideoID = $this.find('video').attr('id') + '-slider-videopush',
            coverPlayBtnID = 'videocover-' + curVideoID,
            $replayBtn = $('#' + curVideoID + '-replay-btn');
        var dataControls = $this.data('embed-video-controls'),
            dataAuto = $this.data('embed-video-autoplay'),
            dataLoop = $this.data('embed-video-loop'),
            dataW = $this.data('embed-video-width'),
            dataH = $this.data('embed-video-height'); //Push a new ID to video
        //Solve the problem that ajax asynchronous loading does not play

        $this.find('.video-js').attr('id', curVideoID);

        if (special_typeof(dataAuto) === ( true ? "undefined" : undefined)) {
          dataAuto = true;
        }

        if (special_typeof(dataLoop) === ( true ? "undefined" : undefined)) {
          dataLoop = true;
        }

        if (special_typeof(dataControls) === ( true ? "undefined" : undefined)) {
          dataControls = false;
        }

        if (special_typeof(dataW) === ( true ? "undefined" : undefined) || dataW == 'auto') {
          dataW = videoWrapperW;
        }

        if (special_typeof(dataH) === ( true ? "undefined" : undefined) || dataH == 'auto') {
          dataH = videoWrapperW / 1.77777777777778;
        } //Display cover and play buttons when some mobile device browsers cannot automatically play video


        if ($('#' + coverPlayBtnID).length == 0) {
          $('<div id="' + coverPlayBtnID + '" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url(' + $this.find('video').attr('poster') + ')"></span><span class="uix-video__cover__playbtn"></span></div>').insertBefore($this);
          var btnEv = Modernizr.touchevents ? 'touchstart' : 'click';
          $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').on(btnEv, function (e) {
            e.preventDefault();
            myPlayer.play();
            $('#' + coverPlayBtnID).hide();
          });
        } //Add replay button to video 


        if ($replayBtn.length == 0) {
          $this.after('<span class="uix-video__btn-play" id="' + curVideoID + '-replay-btn"></span>');
        } //HTML5 video autoplay on mobile revisited


        if (dataAuto && windowWidth <= 768) {
          $this.find('.video-js').attr({
            'autoplay': 'true',
            'muted': 'true',
            'playsinline': 'true'
          });
        }

        var myPlayer = videojs(curVideoID, {
          width: dataW,
          height: dataH,
          loop: dataLoop,
          autoplay: dataAuto
        }, function onPlayerReady() {
          var initVideo = function initVideo(obj) {
            //Get Video Dimensions
            var curW = obj.videoWidth(),
                curH = obj.videoHeight(),
                newW = curW,
                newH = curH;
            newW = videoWrapperW; //Scaled/Proportional Content 

            newH = curH * (newW / curW);

            if (!isNaN(newW) && !isNaN(newH)) {
              obj.height(newH);
              obj.width(newW);
              $this.css('height', newH);
            } //Show this video wrapper


            $this.css('visibility', 'visible'); //Hide loading effect

            $this.find('.vjs-loading-spinner, .vjs-big-play-button').hide();
          };
          /* ---------  Video initialize */


          this.on('loadedmetadata', function () {
            initVideo(this);
          });
          /* ---------  Display the play button  */

          if (!dataAuto) $this.find('.vjs-big-play-button').show();
          $this.find('.vjs-big-play-button').off('click').on('click', function () {
            $(this).hide();
          });
          /* ---------  Set, tell the player it's in fullscreen  */

          if (dataAuto) {
            //Fix an error of Video auto play is not working in browser
            this.muted(true); //Prevent autoplay error: Uncaught (in promise) DOMException

            var promise = this.play();

            if (promise !== undefined) {
              promise.then(function () {// Autoplay started!
              })["catch"](function (error) {
                // Autoplay was prevented.
                $('#' + coverPlayBtnID).show();
                $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                console.log('Autoplay was prevented.');
              });
            }
          }
          /* ---------  Disable control bar play button click */


          if (!dataControls) {
            this.controls(false);
          }
          /* ---------  Determine if the video is auto played from mobile devices  */


          var autoPlayOK = false;
          this.on('timeupdate', function () {
            var duration = this.duration();

            if (duration > 0) {
              autoPlayOK = true;

              if (this.currentTime() > 0) {
                autoPlayOK = true;
                this.off('timeupdate'); //Hide cover and play buttons when the video automatically played

                $('#' + coverPlayBtnID).hide();
              }
            }
          });
          /* ---------  Pause the video when it is not current slider  */

          if (!play) {
            this.pause();
            this.currentTime(0);
          } else {
            //Unmute, because there is interaction, you can turn on the audio.
            this.muted(false);

            if (dataAuto) {
              this.currentTime(0); //Prevent autoplay error: Uncaught (in promise) DOMException

              var _promise = this.play();

              if (_promise !== undefined) {
                _promise.then(function () {// Autoplay started!
                })["catch"](function (error) {
                  // Autoplay was prevented.
                  $('#' + coverPlayBtnID).show();
                  $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                  console.log('Autoplay was prevented.');
                });
              } //Hidden replay button


              $replayBtn.hide(); //Should the video go to the beginning when it ends

              this.on('ended', function () {
                if (dataLoop) {
                  this.currentTime(0);
                  this.play();
                } else {
                  //Replay this video
                  this.currentTime(0);
                  $replayBtn.show().off('click').on('click', function (e) {
                    e.preventDefault();
                    this.play();
                    $replayBtn.hide();
                  });
                }
              });
            }
          }
        });
      });
    }
  };

  module.components.pageLoaded.push(module.ADVANCED_SLIDER_FILTER.pageLoaded);
  return function ADVANCED_SLIDER_FILTER() {
    special_classCallCheck(this, ADVANCED_SLIDER_FILTER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/AJAX-push/js/index.js
function AJAX_push_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AJAX_push_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { AJAX_push_js_typeof = function _typeof(obj) { return typeof obj; }; } else { AJAX_push_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return AJAX_push_js_typeof(obj); }

/* 
 *************************************
 * <!-- Ajax Push Content  -->
 *************************************
 */


var AJAX_PUSH_CONTENT = function (module, $, window, document) {
  if (window.AJAX_PUSH_CONTENT === null) return false;
  module.AJAX_PUSH_CONTENT = module.AJAX_PUSH_CONTENT || {};
  module.AJAX_PUSH_CONTENT.version = '0.1.7';

  module.AJAX_PUSH_CONTENT.documentReady = function ($) {
    // trigger of AJAX request
    var AJAXPageLinks = '[data-ajax-push-content]'; //all images from pages

    var sources = []; //Added timer to prevent page loading errors for a long time

    var timeClockInit;
    /* Need to set it as a global variable for history */

    var ajaxConfig = {
      "container": "#my-ajax-demo-push-container",
      "target": "#my-ajax-demo-target-container",
      "loading": "<div class=\"my-loader\"><span><i class=\"fa fa-spinner fa-spin\"></i> loading <em id=\"app-loading\" data-txt=\"{progress}%\"></em>...</span></div>",
      "method": "POST"
    },
        thisPageTitle = document.title; // The progress of each page load, using global variables to accurately determine

    var loadedProgress = 0; //loading animation

    var loadingAnim = function loadingAnim(per) {
      $('#app-loading').text($('#app-loading').data('txt').replace(/\{progress\}/g, per));
    }; //Click event


    $(document).off('click.AJAX_PUSH_CONTENT').on('click.AJAX_PUSH_CONTENT', AJAXPageLinks, function (event) {
      event.preventDefault(); // The progress of each page load

      loadedProgress = 0; //

      var $this = $(this);
      var curURL = $this.attr('href'),
          config = $this.data('ajax-push-content');

      if (AJAX_push_js_typeof(config) == ( true ? "undefined" : undefined)) {
        config = ajaxConfig;
      } //The currently URL of link


      if (AJAX_push_js_typeof(curURL) === ( true ? "undefined" : undefined)) {
        curURL = $this.closest('a').attr('href');
      } //Prevent multiple request on click


      if ($this.data('request-running')) {
        return;
      }

      $this.data('request-running', true); // Modify the URL without reloading the page

      if (history.pushState) {
        history.pushState(null, null, curURL);
      } else {
        location.hash = curURL;
      } //Click on this link element using an AJAX request


      pushAction($(config.container), config.target, config.loading, curURL, config.method, $this);
      return false;
    }); //Detect URL change & Fire click event

    window.addEventListener('popstate', function (e) {
      var eleTarget = null,
          goURL = location.href;
      $(AJAXPageLinks).each(function () {
        //don't use $( this ).attr( 'href' )
        if (this.href === location.href) {
          eleTarget = this;
          goURL = this.href;
        }
      }); //Empty content that does not exist

      if (eleTarget == null) {
        $(AJAXPageLinks).each(function () {
          var curConfig = $(this).data('ajax-push-content');

          if (AJAX_push_js_typeof(curConfig) != ( true ? "undefined" : undefined)) {
            $(curConfig.container).html('');
          }
        });
      } //Push new content to target container


      var backConfig = $(eleTarget).data('ajax-push-content');

      if (AJAX_push_js_typeof(backConfig) != ( true ? "undefined" : undefined)) {
        pushAction($(backConfig.container), backConfig.target, backConfig.loading, goURL, backConfig.method, $(eleTarget));
      } // Output history button
      //console.log(  $( eleTarget ).data( 'ajax-push-content' ) );

    });
    /*
     * Move Animation
     *
     * @param  {Element} container       - The target container to which the content will be added.
     * @param  {String|Boolean} target  - The instance ID or class name returned from the callback data. If it is "false", the push content is empty.
     * @param  {String} loading         - Content of loading area.
     * @param  {String} url             - The target URL via AJAX. 
     * @param  {String} method          - The HTTP method to use for the request (e.g. "POST", "GET", "PUT")
     * @param  {?Element|Boolean} btn     - Current trigger button. Avoid button events if "false".
     * @return {Void}
     */

    function pushAction(container, target, loading, url, method, btn) {
      if (container.length == 0) return false;

      if (AJAX_push_js_typeof(method) === ( true ? "undefined" : undefined) || method == '') {
        method = 'POST';
      } // Add a request or response interceptor


      var axiosInterceptor = axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        //Display loader
        showLoader(container, loading); //

        return config;
      }, function (error) {
        return Promise.reject(error);
      }); // To send data in the application/x-www-form-urlencoded format instead

      var formData = new FormData();
      var defaultPostData = {
        action: 'load_singlepages_ajax_content'
      };

      for (var k in defaultPostData) {
        formData.append(k, defaultPostData[k]);
      } // Create a request event


      axios({
        timeout: 15000,
        method: method,
        url: url,
        data: formData,
        responseType: 'text'
      }).then(function (response) {
        var htmlCode = response.data; //A function to be called if the request succeeds

        var pushContent = !target ? '' : $(htmlCode).find(target).html(); //Display loading image when AJAX call is in progress
        //Remove existing images

        sources = []; //Push all images from page

        $(htmlCode).find('img').each(function () {
          sources.push({
            "url": this.src,
            "id": 'img-' + UixGUID.create(),
            "type": 'img'
          });
        }); //Push all videos from page

        $(htmlCode).find('.uix-video__slider > video').each(function () {
          var _src = $(this).find('source:first').attr('src');

          if (AJAX_push_js_typeof(_src) === ( true ? "undefined" : undefined)) _src = $(this).attr('src');
          sources.push({
            "url": _src,
            "id": 'video-' + UixGUID.create(),
            "type": 'video'
          });
        }); //Execute after all images have loaded

        var per;
        var perInit = 1;

        if (sources.length == 0) {
          per = 100; //loading animation

          loadingAnim(per); //Remove loader

          hideLoader(container, $(htmlCode).filter('title').text(), btn, htmlCode);
        }

        var loadImages = function loadImages() {
          var promises = [];

          var _loop = function _loop(i) {
            if (sources[i].type == 'img') {
              ///////////
              // IMAGE //
              ///////////   
              promises.push(new Promise(function (resolve, reject) {
                var img = document.createElement("img");
                img.crossOrigin = "anonymous";
                img.src = sources[i].url;

                img.onload = function (image) {
                  //Compatible with safari and firefox
                  if (AJAX_push_js_typeof(image.path) === ( true ? "undefined" : undefined)) {
                    return resolve(image.target.currentSrc);
                  } else {
                    return resolve(image.path[0].currentSrc);
                  }
                };
              }).then(textureLoaded));
            } else {
              ///////////
              // VIDEO //
              ///////////    
              promises.push(new Promise(function (resolve, reject) {
                $('#' + sources[i].id).one('loadedmetadata', resolve);
                return resolve(sources[i].url);
              }).then(textureLoaded));
            }
          };

          for (var i = 0; i < sources.length; i++) {
            _loop(i);
          }

          return Promise.all(promises);
        };

        var textureLoaded = function textureLoaded(url) {
          //loading
          per = parseInt(100 * (perInit / sources.length));
          console.log('progress: ' + per + '%');
          if (isNaN(per)) per = 100; // The progress of each page load

          loadedProgress = per; //loading animation

          loadingAnim(per);
          var texture = null;
          perInit++;
          return per;
        };

        var func = function func() {
          ajaxSucceeds(container, pushContent, $(htmlCode).filter('title').text(), btn);
        }; //images loaded
        //Must be placed behind the loadImages()


        loadImages().then(function (images) {
          clearInterval(timeClockInit);
          func();
        }); //Calculating page load time

        var timeLimit = 10,
            timeStart = new Date().getTime(); //Prevent duplicate runs when returning to this page

        if (timeClockInit) {
          clearInterval(timeClockInit);
        }

        timeClockInit = setInterval(function () {
          //Converting milliseconds to minutes and seconds
          var _time = (new Date().getTime() - timeStart) / 1000;

          if (_time >= timeLimit) {
            console.log('Page load timeout!'); //Remove loader

            if (htmlCode.indexOf('<body') >= 0) {
              window.location.href = location.href;
            } else {
              hideLoader(container, $(htmlCode).filter('title').text(), btn, htmlCode);
            } // clear loader event


            clearInterval(timeClockInit);
            func();
          }
        }, 500);
      })["catch"](function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          var status = error.response.status;
          console.log(status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request); //

          window.location.href = url;
        } else {
          // If there was a problem, we need to
          // dispatch the error condition
          console.log(error.message);
        }
      }); // Remove an interceptor later

      axios.interceptors.request.eject(axiosInterceptor);
    }
    /*
     * A function to be called if the request succeeds
     *
     * @param  {String} container    - The target container to which the content will be added.
     * @param  {String} content      - The data returned from the server
     * @param  {String} title        - The title of a requested page.
     * @param  {?Element} btn          - Current trigger button.
     * @return {Void}
     */


    function ajaxSucceeds(container, content, title, btn) {
      //If the page resource is not loaded, then the following code is not executed
      if (loadedProgress < 100) return false; //Remove loader

      hideLoader(container, title, btn, content);
    }
    /*
     * Remove loader
     *
           * @param  {Element} container - The instance returned from the request succeeds
           * @param  {String} title      - The title of a requested page.
     * @param  {?Element} btn      - Current trigger button.
           * @param  {String} content    - The data returned from the server
     * @return {Void}
     */


    function hideLoader(container, title, btn, content) {
      TweenMax.to(container.find('.ajax-content-loader'), 0.5, {
        alpha: 0,
        onComplete: function onComplete() {
          TweenMax.set(this.target, {
            css: {
              'display': 'none'
            }
          }); //The data returned from the server

          container.html(content).promise().done(function () {
            // Apply some asynchronism scripts
            $(document).UixApplyAsyncScripts(); //Change the page title

            if (title) {
              document.title = title;
            } //Prevent multiple request on click


            if (btn) {
              btn.data('request-running', false);
            }
          });
        },
        //Determine the direction of a jQuery scroll event
        //Fix an issue for mousewheel event is too fast.
        delay: 0.5
      });
    }
    /*
     * Display loader
     *
     * @param  {Element} container       - The target container to which the content will be added.
     * @param  {String} loading         - Content of loading area.
     * @return {Void}
     */


    function showLoader(container, loading) {
      TweenMax.to(container.find('.ajax-content-loader'), 0.3, {
        css: {
          opacity: 1
        },
        ease: Power2.easeOut
      });
      container.html('<div class="ajax-content-loader">' + loading + '</div>').promise().done(function () {
        //loading animation
        loadingAnim(0); //loader effect from AJAX request

        TweenMax.set(container.find('.ajax-content-loader'), {
          css: {
            'display': 'block'
          },
          onComplete: function onComplete() {
            TweenMax.to(this.target, 0.5, {
              alpha: 1
            });
          }
        });
      });
    }
  };

  module.components.documentReady.push(module.AJAX_PUSH_CONTENT.documentReady);
  return function AJAX_PUSH_CONTENT() {
    AJAX_push_js_classCallCheck(this, AJAX_PUSH_CONTENT);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/AJAX/scss/_style.scss
var AJAX_scss_style = __webpack_require__(11);

// CONCATENATED MODULE: ./src/components/ES6/AJAX/js/index.js
function AJAX_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AJAX_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { AJAX_js_typeof = function _typeof(obj) { return typeof obj; }; } else { AJAX_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return AJAX_js_typeof(obj); }

/* 
 *************************************
 * <!-- Ajax Page Loader (Loading A Page via Ajax Into Div)  -->
 *************************************
 */



var AJAX_PAGE_LOADER = function (module, $, window, document) {
  if (window.AJAX_PAGE_LOADER === null) return false;
  module.AJAX_PAGE_LOADER = module.AJAX_PAGE_LOADER || {};
  module.AJAX_PAGE_LOADER.version = '0.1.8';

  module.AJAX_PAGE_LOADER.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //all images from pages

    var sources = []; //Added timer to prevent page loading errors for a long time

    var timeClockInit; //Determine the direction of a jQuery scroll event
    //Fix an issue for mousewheel event is too fast.

    var quietPeriod = 500,
        //Do not change it
    animationTime = 1000,
        //According to page transition animation changes
    loaderRemoveDelay = 500,
        AJAXPageLinks = '[data-ajax-page]',
        $navs = $(AJAXPageLinks).parent().parent().find('li'),
        total = $navs.length,
        $sectionsContainer = $('.uix-ajax-load__fullpage-container'),
        ajaxContainer = '.ajax-container',
        curAjaxPageID = $(ajaxContainer).data('ajax-page-id');
    var lastAnimation = 0; // The progress of each page load, using global variables to accurately determine

    var loadedProgress = 0; //loading animation

    var loadingAnim = function loadingAnim(per) {
      $('#app-loading').text($('#app-loading').data('txt').replace(/\{progress\}/g, per));
    }; //Prevent this module from loading in other pages


    if ($sectionsContainer.length == 0) return false;
    /* 
     ====================================================
     *  Navigation Interaction
     ====================================================
     */
    //Activate the first item

    if ($('.js-uix-ajax-load__container').length == 0) {
      moveTo($(ajaxContainer), false, 'down', 0, false);
    } else {
      //Activate navigation from AJAX request
      if (AJAX_js_typeof(curAjaxPageID) != ( true ? "undefined" : undefined)) $navs.eq(curAjaxPageID).addClass('is-active');
    }
    /* 
     ====================================================
     *  AJAX Interaction
     ====================================================
     */

    /*
     * Initialize the clickable ajax links
     *
     * @return {Void}
     */


    function ajaxInit() {
      if (windowWidth <= 768) {
        $(AJAXPageLinks).data('mobile-running', true);
      } else {
        $(AJAXPageLinks).data('mobile-running', false);
      }
    }

    ajaxInit();
    $window.on('resize', function () {
      windowWidth = window.innerWidth;
      ajaxInit();
    });
    /*
     * Call AJAX on click event for "single pages links"
     *
     */

    $(document).off('click.AJAX_PAGE_LOADER').on('click.AJAX_PAGE_LOADER', AJAXPageLinks, function (e) {
      //Prevents third-party plug-ins from triggering
      if ($(this).data('mobile-running')) {
        return;
      }

      e.preventDefault(); // The progress of each page load

      loadedProgress = 0; //

      var $this = $(this);
      var curIndex = $this.attr('data-index');
      var curURL = $this.attr('href'); //The currently URL of link

      if (AJAX_js_typeof(curURL) === ( true ? "undefined" : undefined)) {
        curURL = $this.closest('a').attr('href');
      } //Prevent multiple request on click


      if ($(AJAXPageLinks).data('request-running')) {
        return;
      }

      $(AJAXPageLinks).data('request-running', true); // Modify the URL without reloading the page

      if (history.pushState) {
        history.pushState(null, null, curURL);
      } else {
        location.hash = curURL;
      } //Click on this link element using an AJAX request


      var dir = $navs.filter('.is-active').find('> a').attr('data-index') > curIndex ? 'up' : 'down';
      moveTo($(ajaxContainer), curURL, dir, curIndex, false);
      return false;
    }); //Detect URL change & Fire click event

    window.addEventListener('popstate', function (e) {
      var eleTarget = null,
          goURL = location.href;
      $(AJAXPageLinks).each(function () {
        //don't use $( this ).attr( 'href' )
        if (this.href === location.href) {
          eleTarget = this;
          goURL = this.href;
        }
      }); //Empty content that does not exist

      if (eleTarget == null) {
        moveTo($(ajaxContainer), false, 'down', 0, false);
      } //Push new content to target container


      var pageIndex = $(eleTarget).data('index'); //Push new content to target container

      if (AJAX_js_typeof(pageIndex) != ( true ? "undefined" : undefined)) {
        moveTo($(ajaxContainer), goURL, 'down', pageIndex, false);
      } // Output history button
      //console.log(  $( eleTarget ).data( 'index' ) );

    });
    /*
     * Scroll initialize
     *
     * @param  {Event} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
     * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
     * @return {Void}
     */

    function scrollMoveInit(event, dir) {
      var timeNow = new Date().getTime(); // Cancel scroll if currently animating or within quiet period

      if (timeNow - lastAnimation < quietPeriod + animationTime) {
        return;
      }

      if (dir == 'down') {
        //scroll down
        moveTo($(ajaxContainer), false, 'down', false, true);
      } else {
        //scroll up
        moveTo($(ajaxContainer), false, 'up', false, true);
      }

      lastAnimation = timeNow;
    }
    /*
     * Move Animation
     *
     * @param  {Element} container    - The instance returned from the request succeeds 
     * @param  {String} url          - The target URL via AJAX.
     * @param  {String} dir          - Rolling direction indicator.
     * @param  {Number} customIndex  - User-specified index value, located on the corresponding AJAX hyperlink.
     * @param  {Boolean} wheel       - Whether to enable mouse wheel control.
     * @return {Void}
     */


    function moveTo(container, url, dir, customIndex, wheel) {
      var index = parseFloat($navs.filter('.is-active').find('> a').attr('data-index'));
      var isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
      var nextIndex = null; //If there is a custom index, it is enabled first

      if (isNumeric.test(customIndex)) {
        nextIndex = customIndex;
      } else {
        if (dir == 'down' || dir === false) {
          nextIndex = index + 1;
        } else {
          nextIndex = index - 1;
        }
      }

      if (nextIndex <= parseFloat(total - 1) && nextIndex >= 0) {
        if (nextIndex > parseFloat(total - 1)) nextIndex = parseFloat(total - 1);
        if (nextIndex < 0) nextIndex = 0; //Prevents third-party plug-ins from triggering

        if ($navs.eq(nextIndex).find('> a').data('mobile-running')) {
          return;
        } //Activate navigation from AJAX request


        $navs.removeClass('is-active');
        $navs.eq(nextIndex).addClass('is-active'); //Use automatic indexing when no URLs come in.

        if (!url || AJAX_js_typeof(url) === ( true ? "undefined" : undefined)) {
          url = $navs.eq(nextIndex).find('> a').attr('href');
        } // Modify the URL without reloading the page when mouse wheel


        if (wheel) {
          var turl = $navs.eq(nextIndex).find('> a').attr('href');

          if (history.pushState) {
            history.pushState(null, null, url);
          } else {
            location.hash = turl;
          }
        } //Click on this link element using an AJAX request
        // Add a request or response interceptor


        var axiosInterceptor = axios.interceptors.request.use(function (config) {
          // Do something before request is sent
          //Display loader
          showLoader(); //

          return config;
        }, function (error) {
          return Promise.reject(error);
        }); // To send data in the application/x-www-form-urlencoded format instead

        var formData = new FormData();
        var defaultPostData = {
          action: 'load_singlepages_ajax_content'
        };

        for (var k in defaultPostData) {
          formData.append(k, defaultPostData[k]);
        }
        /*
        // For multiple form fields data acquisition
        const formData = new FormData();
        const oldFormData = $this.serializeArray();
        oldFormData.forEach(function(item){
            formData.append(item.name, item.value);
        });
        formData.append('action', 'load_singlepages_ajax_content');
        */
        // Create a request event


        axios({
          timeout: 15000,
          method: AJAX_js_typeof(container.data('ajax-method')) === ( true ? "undefined" : undefined) ? 'POST' : container.data('ajax-method'),
          url: url,
          data: formData,
          responseType: 'text'
        }).then(function (response) {
          var htmlCode = response.data; //A function to be called if the request succeeds
          //Display loading image when AJAX call is in progress
          //Remove existing images

          sources = []; //Push all images from page

          $(htmlCode).find('img').each(function () {
            sources.push({
              "url": this.src,
              "id": 'img-' + UixGUID.create(),
              "type": 'img'
            });
          }); //Push all videos from page

          $(htmlCode).find('.uix-video__slider > video').each(function () {
            var _src = $(this).find('source:first').attr('src');

            if (AJAX_js_typeof(_src) === ( true ? "undefined" : undefined)) _src = $(this).attr('src');
            sources.push({
              "url": _src,
              "id": 'video-' + UixGUID.create(),
              "type": 'video'
            });
          }); //Execute after all images have loaded

          var per;
          var perInit = 1;

          if (sources.length == 0) {
            per = 100; //loading animation

            loadingAnim(per); //Remove loader

            var oldContent = container.html();
            hideLoader(container, $(htmlCode).filter('title').text(), dir, oldContent, htmlCode);
          }

          var loadImages = function loadImages() {
            var promises = [];

            var _loop = function _loop(i) {
              if (sources[i].type == 'img') {
                ///////////
                // IMAGE //
                ///////////   
                promises.push(new Promise(function (resolve, reject) {
                  var img = document.createElement("img");
                  img.crossOrigin = "anonymous";
                  img.src = sources[i].url;

                  img.onload = function (image) {
                    //Compatible with safari and firefox
                    if (AJAX_js_typeof(image.path) === ( true ? "undefined" : undefined)) {
                      return resolve(image.target.currentSrc);
                    } else {
                      return resolve(image.path[0].currentSrc);
                    }
                  };
                }).then(textureLoaded));
              } else {
                ///////////
                // VIDEO //
                ///////////    
                promises.push(new Promise(function (resolve, reject) {
                  $('#' + sources[i].id).one('loadedmetadata', resolve);
                  return resolve(sources[i].url);
                }).then(textureLoaded));
              }
            };

            for (var i = 0; i < sources.length; i++) {
              _loop(i);
            }

            return Promise.all(promises);
          };

          var textureLoaded = function textureLoaded(url) {
            //loading
            per = parseInt(100 * (perInit / sources.length));
            console.log('progress: ' + per + '%');
            if (isNaN(per)) per = 100; // The progress of each page load

            loadedProgress = per; //loading animation

            loadingAnim(per);
            var texture = null;
            perInit++;
            return per;
          };

          var func = function func() {
            ajaxSucceeds(dir, container, $(htmlCode).find('.js-uix-ajax-load__container').html(), $(htmlCode).filter('title').text());
          }; //images loaded
          //Must be placed behind the loadImages()


          loadImages().then(function (images) {
            clearInterval(timeClockInit);
            func();
          }); //Calculating page load time

          var timeLimit = 10,
              timeStart = new Date().getTime(); //Prevent duplicate runs when returning to this page

          if (timeClockInit) {
            clearInterval(timeClockInit);
          }

          timeClockInit = setInterval(function () {
            //Converting milliseconds to minutes and seconds
            var _time = (new Date().getTime() - timeStart) / 1000;

            if (_time >= timeLimit) {
              console.log('Page load timeout!'); //Remove loader

              if (htmlCode.indexOf('<body') >= 0) {
                window.location.href = location.href;
              } else {
                var _oldContent = container.html();

                hideLoader(container, $(htmlCode).filter('title').text(), dir, _oldContent, htmlCode);
              } // clear loader event


              clearInterval(timeClockInit);
              func();
            }
          }, 500);
        })["catch"](function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            var status = error.response.status;
            console.log(status);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request); //

            window.location.href = url;
          } else {
            // If there was a problem, we need to
            // dispatch the error condition
            console.log(error.message);
          }
        }); // Remove an interceptor later

        axios.interceptors.request.eject(axiosInterceptor);
      }
    }
    /*
     * A function to be called if the request succeeds
     *
     * @param  {String} dir       - Gets a value that indicates the amount that the mouse wheel has changed.
     * @param  {Element} container - The instance returned from the request succeeds
     * @param  {String} content   - The data returned from the server
     * @param  {String} title        - The title of a requested page.
     * @return {Void}
     */


    function ajaxSucceeds(dir, container, content, title) {
      //If the page resource is not loaded, then the following code is not executed
      if (loadedProgress < 100) return false; //Remove loader

      var oldContent = container.html();
      hideLoader(container, title, dir, oldContent, content);
    }
    /*
     * Remove loader
     *
           * @param  {Element} container - The instance returned from the request succeeds
           * @param  {String} title     - The title of a requested page.
     * @param  {String} dir       - Gets a value that indicates the amount that the mouse wheel has changed.
     * @param  {String} oldContent   - The old data returned from the server
           * @param  {String} content   - The data returned from the server
     * @return {Void}
     */


    function hideLoader(container, title, dir, oldContent, content) {
      TweenMax.to('.uix-ajax-load__loader', 0.5, {
        alpha: 0,
        onComplete: function onComplete() {
          TweenMax.set(this.target, {
            css: {
              'display': 'none'
            }
          }); //The data returned from the server

          container.html(content).promise().done(function () {
            //Transition effect between two elements.
            eleTransitionEff(dir, oldContent, content); //Change the page title

            if (title) {
              document.title = title;
            } //Prevent multiple request on click


            $(AJAXPageLinks).data('request-running', false);
          });
        },
        delay: loaderRemoveDelay / 1000
      });
    }
    /*
     * Display loader
     *
     * @return {Void}
     */


    function showLoader() {
      //loading animation
      loadingAnim(0); //loader effect from AJAX request

      TweenMax.set('.uix-ajax-load__loader', {
        css: {
          'display': 'block'
        },
        onComplete: function onComplete() {
          TweenMax.to(this.target, 0.5, {
            alpha: 1
          });
        }
      });
    }
    /*
     * Transition effect between two elements.
     *
     * @param  {String} dir            - Gets a value that indicates the amount that the mouse wheel has changed.
     * @param  {String} oldContent     - A string of HTML to set as the content of matched old element.
     * @param  {String} newContent     - A string of HTML to set as the content of matched new element.
     * @return {Void}
     */


    function eleTransitionEff(dir, oldContent, newContent) {
      var $originalItem = $sectionsContainer.find('> section'),
          $cloneItem = $originalItem.clone(); //Reset the original element

      $originalItem.css({
        'z-index': 1
      }); //Clone the last element to the first position

      $cloneItem.prependTo($sectionsContainer).css({
        'z-index': 2,
        'transform': 'translateY(' + (dir == 'down' || dir === false ? windowHeight : -windowHeight) + 'px)'
      }) //Add the latest content to the new container
      .find(ajaxContainer).html(newContent);
      $originalItem.first().find(ajaxContainer).html(oldContent).promise().done(function () {
        TweenMax.to($originalItem.first(), animationTime / 1000, {
          y: dir == 'down' || dir === false ? -windowHeight / 2 : windowHeight / 2,
          ease: Power2.easeOut
        });
        TweenMax.to($cloneItem, animationTime / 1000, {
          y: 0,
          ease: Power2.easeOut,
          onComplete: function onComplete() {
            //Remove duplicate elements
            $originalItem.first().remove(); // Apply some asynchronism scripts

            $(document).UixApplyAsyncScripts();
          }
        });
      });
    }
    /* 
     ====================================================
     *  Mouse Wheel Method
     ====================================================
     */


    var startY = 0;

    var onTouchStart = function onTouchStart(e) {
      var touches = e.touches;

      if (touches && touches.length) {
        startY = touches[0].pageY;
      }
    };

    var onDeviceWheel = function onDeviceWheel(e) {
      //Gets a value that indicates the amount that the mouse wheel has changed.
      var dir,
          delta,
          mobileDeltaY = null;
      var touches = e.touches;

      if (touches && touches.length) {
        mobileDeltaY = startY - touches[0].pageY;
      } else {
        delta = Math.max(-1, Math.min(1, -e.deltaY));
      }

      if (mobileDeltaY != null) {
        if (mobileDeltaY >= 50) {
          //--- swipe up
          dir = 'up';
        }

        if (mobileDeltaY <= -50) {
          //--- swipe down
          dir = 'down';
        }
      } else {
        if (delta < 0) {
          //scroll down
          dir = 'down';
        } else {
          //scroll up
          dir = 'up';
        }
      }

      scrollMoveInit(e, dir);
    };

    window.addEventListener('wheel', onDeviceWheel, browser.supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('touchstart', onTouchStart, browser.supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('touchmove', onDeviceWheel, browser.supportsPassive ? {
      passive: true
    } : false);
  };

  module.components.documentReady.push(module.AJAX_PAGE_LOADER.documentReady);
  return function AJAX_PAGE_LOADER() {
    AJAX_js_classCallCheck(this, AJAX_PAGE_LOADER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/back-to-top/scss/_style.scss
var back_to_top_scss_style = __webpack_require__(12);

// CONCATENATED MODULE: ./src/components/ES6/back-to-top/js/index.js
function back_to_top_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Back to Top -->
 *************************************
 */


var BACK_TO_TOP = function (module, $, window, document) {
  if (window.BACK_TO_TOP === null) return false;
  module.BACK_TO_TOP = module.BACK_TO_TOP || {};
  module.BACK_TO_TOP.version = '0.0.8';

  module.BACK_TO_TOP.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    $('<a href="#" id="uix-to-top"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>').appendTo('body');
    $.when($('#uix-to-top').length > 0).then(function () {
      //-------- Sticky button of back to top 
      //Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
      var $el = $('#uix-to-top');
      $window.off('scroll.BACK_TO_TOP touchmove.BACK_TO_TOP').on('scroll.BACK_TO_TOP touchmove.BACK_TO_TOP', function () {
        var scrolled = $(this).scrollTop(),
            spyTop = windowHeight / 2;

        if (scrolled >= spyTop) {
          $el.addClass('is-active');
        } else {
          $el.removeClass('is-active');
        }
      }); //-------- Click event of back button

      $el.off('click').on('click', function (e) {
        e.preventDefault();
        TweenMax.to(window, 0.5, {
          scrollTo: {
            y: 0,
            //y: "max" --> vertical scroll to bottom
            autoKill: false
          },
          ease: Power2.easeOut
        });
        return false;
      });
    });
  };

  module.components.documentReady.push(module.BACK_TO_TOP.documentReady);
  return function BACK_TO_TOP() {
    back_to_top_js_classCallCheck(this, BACK_TO_TOP);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/circle-layout/scss/_style.scss
var circle_layout_scss_style = __webpack_require__(13);

// CONCATENATED MODULE: ./src/components/ES6/circle-layout/js/index.js
function circle_layout_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function circle_layout_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { circle_layout_js_typeof = function _typeof(obj) { return typeof obj; }; } else { circle_layout_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return circle_layout_js_typeof(obj); }

/* 
 *************************************
 * <!-- Circle Layout -->
 *************************************
 */


var CIRCLE_LAYOUT = function (module, $, window, document) {
  if (window.CIRCLE_LAYOUT === null) return false;
  module.CIRCLE_LAYOUT = module.CIRCLE_LAYOUT || {};
  module.CIRCLE_LAYOUT.version = '0.0.1';

  module.CIRCLE_LAYOUT.documentReady = function ($) {
    $('.js-uix-circle-layout').each(function (id) {
      var $this = $(this);
      var $ul = $this.find('> ul'),
          $li = $ul.find('> li'),
          liWidth = $li.first().outerWidth(),
          liHeight = $li.first().outerHeight();
      var display = $this.data('circle-layout-display'),
          radius = $this.data('circle-layout-radius'),
          radius2 = $this.data('circle-layout-radius-c'),
          rotation = $this.data('circle-layout-rotation');

      if (circle_layout_js_typeof(display) === ( true ? "undefined" : undefined)) {
        display = 5;
      }

      if (circle_layout_js_typeof(radius) === ( true ? "undefined" : undefined)) {
        radius = 180;
      }

      if (circle_layout_js_typeof(radius2) === ( true ? "undefined" : undefined)) {
        radius2 = 110;
      }

      if (circle_layout_js_typeof(rotation) === ( true ? "undefined" : undefined)) {
        rotation = 0;
      }

      $this.css({
        'width': radius * 2 + 'px'
      });
      $ul.css({
        'width': radius * 2 + 'px',
        'height': radius * 2 + 'px',
        'transform': 'rotate(' + parseFloat(rotation) + 'deg)'
      });
      $ul.next('div').css({
        'width': radius2 * 2 + 'px',
        'height': radius2 * 2 + 'px'
      }); //Layout components in a circle layout

      var step = 2 * Math.PI / display,
          pad = $ul.width();
      var angle = 0,
          transitionDelay = 0;
      $li.each(function () {
        //Can'nt use arrow function here!!!
        // 'this' works differently with arrow fucntions
        var el = $(this),
            x = radius * Math.cos(angle) - liWidth / 2,
            y = radius * Math.sin(angle) - liHeight / 2;
        el.css({
          'transform': 'translate(' + parseFloat(x + liWidth / 2) + 'px,' + parseFloat(pad / 2 + y + liHeight / 2) + 'px)',
          'transition-delay': transitionDelay + "s"
        }).find('> a').css({
          'transform': 'rotate(' + parseFloat(-rotation) + 'deg)'
        });
        angle += step;
        transitionDelay += 0.15;
      });
    });
  };

  module.components.documentReady.push(module.CIRCLE_LAYOUT.documentReady);
  return function CIRCLE_LAYOUT() {
    circle_layout_js_classCallCheck(this, CIRCLE_LAYOUT);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/counter/js/fn/count-to.js
var count_to = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/ES6/counter/scss/_style.scss
var counter_scss_style = __webpack_require__(15);

// CONCATENATED MODULE: ./src/components/ES6/counter/js/index.js
function counter_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function counter_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { counter_js_typeof = function _typeof(obj) { return typeof obj; }; } else { counter_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return counter_js_typeof(obj); }

/* 
 *************************************
 * <!-- Counter -->
 *************************************
 */



var COUNTER = function (module, $, window, document) {
  if (window.COUNTER === null) return false;
  module.COUNTER = module.COUNTER || {};
  module.COUNTER.version = '0.0.4';

  module.COUNTER.documentReady = function ($) {
    var $scrollElements = $('[data-counter-number]');
    $(window).off('scroll.COUNTER touchmove.COUNTER');
    $scrollElements.each(function () {
      var viewport = 1;
      var $el = $(this); //

      var scrollUpdate = function scrollUpdate() {
        var spyTop = $el[0].getBoundingClientRect().top; //Prevent asynchronous loading of repeated calls

        var actived = $el.data('activated');

        if (spyTop < window.innerHeight * viewport) {
          if (counter_js_typeof(actived) === ( true ? "undefined" : undefined)) {
            $el.UixCountTo(); //Prevents front-end javascripts that are activated in the background to repeat loading.

            $el.data('activated', 1);
          } //endif actived

        }
      };

      scrollUpdate(); // Please do not use scroll's off method in each

      $(window).on('scroll.COUNTER touchmove.COUNTER', function (event) {
        scrollUpdate();
      });
    }); //end each        
  };

  module.components.documentReady.push(module.COUNTER.documentReady);
  return function COUNTER() {
    counter_js_classCallCheck(this, COUNTER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/dropdown-menu/scss/_style.scss
var dropdown_menu_scss_style = __webpack_require__(16);

// CONCATENATED MODULE: ./src/components/ES6/dropdown-menu/js/index.js
function dropdown_menu_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dropdown_menu_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { dropdown_menu_js_typeof = function _typeof(obj) { return typeof obj; }; } else { dropdown_menu_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return dropdown_menu_js_typeof(obj); }

/* 
 *************************************
 * <!-- Dropdown Menu -->
 *************************************
 */


var DROPDOWN_MENU = function (module, $, window, document) {
  if (window.DROPDOWN_MENU === null) return false;
  module.DROPDOWN_MENU = module.DROPDOWN_MENU || {};
  module.DROPDOWN_MENU.version = '0.0.7';

  module.DROPDOWN_MENU.documentReady = function ($) {
    //Initialize option status
    $('.uix-dropdown-menu').each(function () {
      var v = $(this).find('input[type="hidden"]').val(),
          selectedIndex = $(this).find('ul > li > a[data-value="' + v + '"]').parent().index(),
          $li = $(this).find('ul > li');
      $li.removeClass('is-active');
      $li.eq(selectedIndex).addClass('is-active');
      $(this).find('> summary > span').html($li.eq(selectedIndex).find('> a').data('display-text'));
    }); //Create a trigger of Dropdown Menu on Click
    //Use $( document ) to support other click events for ajax

    $(document).off('click.DROPDOWN_MENU').on('click.DROPDOWN_MENU', '.uix-dropdown-menu > summary', function (e) {
      // stop propagation of this event, it will never reach body in bubbling phase.
      e.stopPropagation();
      var $this = $(this).parent('.uix-dropdown-menu');
      $this.toggleClass('is-opened');
    });
    $(document).off('click.DROPDOWN_MENU_LINK').on('click.DROPDOWN_MENU_LINK', '.uix-dropdown-menu li a', function (e) {
      // stop propagation of this event, it will never reach body in bubbling phase.
      e.stopPropagation();
      var $this = $(this).closest('.uix-dropdown-menu');

      if ($this.hasClass('is-opened')) {
        $this.removeAttr('open').removeClass('is-opened');
      }

      if (dropdown_menu_js_typeof($(this).attr('data-value')) != ( true ? "undefined" : undefined) && $(this).attr('data-value') != '') {
        $this.find('input[type="hidden"]').val($(this).attr('data-value'));
      }

      if (dropdown_menu_js_typeof($(this).data('display-text')) != ( true ? "undefined" : undefined) && $(this).data('display-text') != '') {
        $this.find('> summary > span').html($(this).data('display-text'));
      } // update active status


      $this.find('li').removeClass('is-active');
      $(this).parent().addClass('is-active');
    }); //Close the target
    //Do not add off() to this

    $(document.body).on('click', function (e) {
      //Apply click method to outer div but not inner div
      if (!$(e.target.offsetParent).hasClass('uix-dropdown-menu')) {
        $('.uix-dropdown-menu').removeAttr('open').removeClass('is-opened');
      }
    });
  };

  module.components.documentReady.push(module.DROPDOWN_MENU.documentReady);
  return function DROPDOWN_MENU() {
    dropdown_menu_js_classCallCheck(this, DROPDOWN_MENU);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/dropdown-menu2/scss/_style.scss
var dropdown_menu2_scss_style = __webpack_require__(17);

// CONCATENATED MODULE: ./src/components/ES6/dropdown-menu2/js/index.js
function dropdown_menu2_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Dropdown Menu 2 (Multi-level drop-down navigation) -->
 *************************************
 */


var DROPDOWN_MENU2 = function (module, $, window, document) {
  if (window.DROPDOWN_MENU2 === null) return false;
  module.DROPDOWN_MENU2 = module.DROPDOWN_MENU2 || {};
  module.DROPDOWN_MENU2.version = '0.0.5';

  module.DROPDOWN_MENU2.documentReady = function ($) {
    var $verticalMenuLi = $('.uix-vertical-menu li');
    $verticalMenuLi.find('> a').off('click').on('click', function (e) {
      var $sub = $(this).next('ul');

      if ($sub.length > 0) {
        e.preventDefault(); //Its value is not a boolean but a string

        var expanded = $(this).attr('aria-expanded') == 'true' ? false : true;

        if (expanded) {
          //Hide other all sibling <ul> of the selected element
          var $e = $(this).parent('li').siblings().find('> a');
          $e.removeClass('is-active').attr('aria-expanded', false);
          $(this).addClass('is-active').attr('aria-expanded', true);
          TweenMax.to($e.next('ul'), 0.5, {
            height: 0
          }); //to open
          // - temporarilty set height:auto
          // - tween from height:0

          TweenMax.set($sub, {
            height: 'auto'
          });
          TweenMax.from($sub, 0.5, {
            height: 0
          });
        } else {
          $(this).removeClass('is-active').attr('aria-expanded', false); //to close

          TweenMax.to($sub, 0.5, {
            height: 0
          });
        }

        return false;
      }
    }); //Add multilevel indicator arrow

    if ($verticalMenuLi.find('> a .uix-vertical-menu__arrow').length == 0) {
      $verticalMenuLi.find('> a').append('<span class="uix-vertical-menu__arrow"></span>');
    }

    $verticalMenuLi.each(function () {
      var len = $(this).find('ul').length;

      if (len == 0) {
        $(this).children('a').children('.uix-vertical-menu__arrow').hide();
      }
    });
  };

  module.components.documentReady.push(module.DROPDOWN_MENU2.documentReady);
  return function DROPDOWN_MENU2() {
    dropdown_menu2_js_classCallCheck(this, DROPDOWN_MENU2);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/select.js
var fn_select = __webpack_require__(1);

// CONCATENATED MODULE: ./src/components/ES6/dynamic-dropdown-list-json/js/index.js
function dynamic_dropdown_list_json_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dynamic_dropdown_list_json_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { dynamic_dropdown_list_json_js_typeof = function _typeof(obj) { return typeof obj; }; } else { dynamic_dropdown_list_json_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return dynamic_dropdown_list_json_js_typeof(obj); }

/* 
 *************************************
 * <!-- Dynamic Drop Down List from JSON -->
 *************************************
 */


var DYNAMIC_DD_LIST = function (module, $, window, document) {
  if (window.DYNAMIC_DD_LIST === null) return false;
  module.DYNAMIC_DD_LIST = module.DYNAMIC_DD_LIST || {};
  module.DYNAMIC_DD_LIST.version = '0.1.1';

  module.DYNAMIC_DD_LIST.documentReady = function ($) {
    $('[data-ajax-dynamic-dd-json]').each(function () {
      var $this = $(this);
      var ranID = 'dynamic-dd-control-' + UixGUID.create(),
          ID = $this.attr('id');
      var jsonFile = $this.data('ajax-dynamic-dd-json'),
          dataType = $this.data('ajax-dynamic-dd-datatype'),
          method = $this.data('ajax-dynamic-dd-method'),
          paramsWithJson = $this.data('ajax-dynamic-dd-data'),
          placeholderStrArr = $this.data('ajax-dynamic-dd-placeholder-str'),
          controlIDsArr = $this.data('ajax-dynamic-dd-control-ids'),
          appendTemp = $this.data('ajax-dynamic-dd-append-temp'),
          curID;
      if (dynamic_dropdown_list_json_js_typeof(placeholderStrArr) === ( true ? "undefined" : undefined)) placeholderStrArr = [];
      if (dynamic_dropdown_list_json_js_typeof(controlIDsArr) === ( true ? "undefined" : undefined)) controlIDsArr = [];
      if (dynamic_dropdown_list_json_js_typeof(jsonFile) === ( true ? "undefined" : undefined)) jsonFile = '';
      if (dynamic_dropdown_list_json_js_typeof(paramsWithJson) === ( true ? "undefined" : undefined)) paramsWithJson = {};
      if (dynamic_dropdown_list_json_js_typeof(method) === ( true ? "undefined" : undefined)) method = 'POST';
      if (dynamic_dropdown_list_json_js_typeof(appendTemp) === ( true ? "undefined" : undefined)) appendTemp = '';
      if (dynamic_dropdown_list_json_js_typeof(ID) === ( true ? "undefined" : undefined)) $this.attr('id', ranID);
      if (dynamic_dropdown_list_json_js_typeof(dataType) === ( true ? "undefined" : undefined)) dataType = 'category'; // options: category, place

      curID = $this.attr('id'); //Parse the JSON data

      if (jsonFile != '') {
        //Initialize dependent/chained dropdown list
        var dataExist = $this.data('exist');

        if (dynamic_dropdown_list_json_js_typeof(dataExist) === ( true ? "undefined" : undefined) && dataExist != 1) {
          // Add a request or response interceptor
          var axiosInterceptor = axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            //
            return config;
          }, function (error) {
            return Promise.reject(error);
          }); // To send data in the application/x-www-form-urlencoded format instead

          var formData = new FormData();
          var defaultPostData = paramsWithJson;

          for (var k in defaultPostData) {
            formData.append(k, defaultPostData[k]);
          } // Create a request event


          axios({
            timeout: 15000,
            method: method,
            url: jsonFile,
            data: formData,
            responseType: 'json'
          }).then(function (response) {
            var jsonData = response.data; //Recursive and initialized functions
            //------------------------------------

            var initSelectControls = function initSelectControls(selectIndex, nodeName, $select, arr, allControlsLength) {
              //-- Hide or display controls
              var controlView = function controlView() {
                for (var p = 0; p < controlIDsArr.length; p++) {
                  var data = controlIDsArr[p];
                  var curSelInputID = data != null ? controlIDsArr[p].replace('#', '') : data;
                  var curSelWrapperID = curSelInputID + '----select';
                  var isCustomSel = $('#' + curSelWrapperID).hasClass('uix-controls__select');
                  var $curSelWrapper = isCustomSel ? $('#' + curSelWrapperID).parent('.uix-controls__select-wrapper') : $('#' + curSelWrapperID); //hide/display select wrapper

                  if ($('#' + curSelWrapperID).find('select option').length == 0) {
                    $curSelWrapper.hide();
                  } else {
                    $curSelWrapper.show();
                  } //Render the custom select


                  if (isCustomSel) $(document).UixRenderCustomSelect();
                }
              }; //-- Clear the select controls behind       


              var clearAllSelControls = function clearAllSelControls() {
                if (allControlsLength > selectIndex) {
                  for (var i = allControlsLength; i > selectIndex; i--) {
                    var $targetClearSel = $this.find('select').eq(i - 1);
                    var tid = $targetClearSel.closest('.uix-controls').attr('id');
                    var curSelInputID = tid != null ? tid.replace('----select', '') : tid; //Remove options

                    $targetClearSel.empty(); //update a empty value

                    $('#' + curSelInputID).val(''); //Hide or display controls

                    controlView();
                  }
                }
              };

              clearAllSelControls(); //-- Json Infinite Recursion

              if (arr == '') return false; //Empty data sent when the change event is triggered

              if (arr) {
                /*
                console.log( '--------' );
                console.log( '-> target select ID: ' + $select.closest( '.uix-controls' ).attr( 'id' ) );
                console.log( '-> target select data: ' );
                console.log( arr );
                */
                //add empty option
                var emptyOption = '<option value="">' + placeholderStrArr[selectIndex] + '</option>';
                $select.append(emptyOption); //

                for (var i = 0; i < arr.length; i++) {
                  if (arr[i]) {
                    ///////////////////////////////////////
                    //////////////// category /////////////
                    ///////////////////////////////////////
                    if (dataType == 'category') {
                      var _name = arr[i].name;
                      $select.append('<option data-index="' + i + '" value="' + _name + '">' + _name + '</option>');
                    } // endif dataType
                    ///////////////////////////////////////
                    //////////////// place ////////////////
                    /////////////////////////////////////// 


                    if (dataType == 'place') {
                      var _name2 = arr[i].name;

                      if (dynamic_dropdown_list_json_js_typeof(_name2) === ( true ? "undefined" : undefined)) {
                        $select.append('<option data-index="' + i + '" value="' + arr[i] + '">' + arr[i] + '</option>');
                      } else {
                        $select.append('<option data-index="' + i + '" value="' + _name2 + '">' + _name2 + '</option>');
                      }
                    } // endif dataType     

                  }
                } //end for arr  

              } //endif arr
              //-- Hide or display controls


              controlView(); //-- Change Event

              $select.off('change.DYNAMIC_DD_LIST').on('change.DYNAMIC_DD_LIST', function () {
                var curDeep = $(this).find('option:selected').data('index');
                var curVal = $(this[this.selectedIndex]).val();
                var $targetSel = $this.find('select').eq(selectIndex + 1); //update a new value

                var tid = $(this).closest('.uix-controls').attr('id');
                $('#' + (tid != null ? tid.replace('----select', '') : tid)).val(curVal); //Remove options

                if (curVal == '' || curVal == null) {
                  $targetSel.empty();
                } //Hide or display controls


                controlView(); //send new JSON data

                var sendData = arr[curDeep] ? arr[curDeep][nodeName] : '';
                initSelectControls(selectIndex + 1, 'list', $targetSel, sendData, allControlsLength);
              });
            }; // Append the default select control to the container
            //------------------------------------


            for (var p = 0; p < controlIDsArr.length; p++) {
              var data = controlIDsArr[p];
              var curSelInputID = data != null ? controlIDsArr[p].replace('#', '') : data;
              var curSelWrapperID = curSelInputID + '----select';

              if ($('#' + curSelWrapperID).length == 0) {
                $($.parseHTML(appendTemp)).attr('id', curSelWrapperID).appendTo($this);
              }
            } //endfor controlIDsArr 
            // Initialize the selection box
            //------------------------------------


            var lastData = controlIDsArr[controlIDsArr.length - 1];
            var lastSelInputID = lastData != null ? lastData.replace('#', '') : lastData;
            var lastSelWrapperID = lastSelInputID + '-select';
            $.when($('#' + lastSelWrapperID).length > 0).then(function () {
              initSelectControls(0, 'list', $this.find('select').first(), jsonData, controlIDsArr.length); //-- Reset default value and select style

              for (var _p = 0; _p < controlIDsArr.length; _p++) {
                var _data = controlIDsArr[_p];

                var _curSelInputID = _data != null ? controlIDsArr[_p].replace('#', '') : _data;

                var _curSelWrapperID = _curSelInputID + '----select';

                var isCustomSel = $('#' + _curSelWrapperID).hasClass('uix-controls__select');
                var $curSelWrapper = isCustomSel ? $('#' + _curSelWrapperID).parent('.uix-controls__select-wrapper') : $('#' + _curSelWrapperID); //update a new value to select control when the default is not empty

                var defaultVal = $('#' + _curSelInputID).data('default-value');

                if (defaultVal != '' && defaultVal != null) {
                  $('#' + _curSelInputID).val(defaultVal);
                  $curSelWrapper.find('select').val(defaultVal).attr('selected', 'selected').change();
                } //Render the custom select


                if (isCustomSel) {
                  $(document).UixRenderCustomSelect();
                  $curSelWrapper.find('select').attr('selected', 'selected').change();
                }
              }
            });
          })["catch"](function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              var status = error.response.status;
              console.log(status);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // If there was a problem, we need to
              // dispatch the error condition
              console.log(error.message);
            }
          }); // Remove an interceptor later

          axios.interceptors.request.eject(axiosInterceptor); //Prevent the form from being initialized again

          $this.data('exist', 1);
        }
      } // end of jsonFile

    });
  };

  module.components.documentReady.push(module.DYNAMIC_DD_LIST.documentReady);
  return function DYNAMIC_DD_LIST() {
    dynamic_dropdown_list_json_js_classCallCheck(this, DYNAMIC_DD_LIST);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/flexslider/scss/_style.scss
var flexslider_scss_style = __webpack_require__(20);

// CONCATENATED MODULE: ./src/components/ES6/flexslider/js/index.js
function flexslider_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function flexslider_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { flexslider_js_typeof = function _typeof(obj) { return typeof obj; }; } else { flexslider_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return flexslider_js_typeof(obj); }

/* 
 *************************************
 * <!-- Flexslider -->
 *************************************
 */

/**
 * module.FLEXSLIDER
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */


var FLEXSLIDER = function (module, $, window, document) {
  if (window.FLEXSLIDER === null) return false;
  module.FLEXSLIDER = module.FLEXSLIDER || {};
  module.FLEXSLIDER.version = '0.1.8';

  module.FLEXSLIDER.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var flexslider = {
      vars: {}
    };
    /*
     * Tiny helper function to add breakpoints.
     *
     * @param  {Number} number           - Number of carousel items that should be visible.
     * @return {Void}
     */

    function getGridSize(number) {
      return window.innerWidth <= 768 ? 1 : number;
    }
    /*
     * Return an event from callback function to each slider.
     *
     * @param  {Element} thisSlider             - The current slider.
     * @param  {Element} sliderWrapper          - The current slider wrapper.
     * @param  {String} fireState              - State of fire asynchronously.
     * @return {Number}                        - Index of current slider .
     */


    function initslides(sliderWrapper, thisSlider, fireState) {
      var prefix = 'uix-flexslider__';
      if (thisSlider.find('.' + prefix + 'item').length == 0) return false;
      var curIndex = thisSlider.currentSlide,
          count = thisSlider.count,
          activeClass = prefix + 'item--active',
          prevClass = activeClass + '-prev',
          nextClass = activeClass + '-next',
          $items = thisSlider.find('.' + prefix + 'item'),
          $current = thisSlider.slides.eq(curIndex),
          $prev = thisSlider.slides.eq(curIndex - 1),
          $next = thisSlider.slides.eq(thisSlider.animatingTo),
          $first = thisSlider.slides.eq(0),
          curHeight = $current.height(),
          dataNhumbs = thisSlider.data('my-nav-thumbs'),
          dataPNThumbs = thisSlider.data('my-prev-next-thumbs'),
          dataTimeline = thisSlider.data('my-nav-timeline'),
          dataCountTotal = thisSlider.data('my-count-total'),
          dataCountCur = thisSlider.data('my-count-now'),
          dataShowItems = thisSlider.data('my-multiple-items'),
          dataShowItemsMove = thisSlider.data('my-multiple-items-move'),
          dataParallax = thisSlider.data('my-parallax');
      if (flexslider_js_typeof(dataPNThumbs) === ( true ? "undefined" : undefined)) dataPNThumbs = false;
      if (flexslider_js_typeof(dataTimeline) === ( true ? "undefined" : undefined)) dataTimeline = false;
      if (flexslider_js_typeof(dataCountTotal) === ( true ? "undefined" : undefined)) dataCountTotal = false;
      if (flexslider_js_typeof(dataCountCur) === ( true ? "undefined" : undefined)) dataCountCur = false;
      if (flexslider_js_typeof(dataParallax) === ( true ? "undefined" : undefined)) dataParallax = false;
      if (flexslider_js_typeof(dataShowItemsMove) === ( true ? "undefined" : undefined)) dataShowItemsMove = 1; //Total counter selector
      //Current counter selector.

      var countTotalSelector = dataCountTotal ? $(dataCountTotal) : $('.uix-flexslider__mycontrols__count em.count'),
          countCurSelector = dataCountCur ? $(dataCountCur) : $('.uix-flexslider__mycontrols__count em.current'); // Fires when the slider loads the first slide.
      // Fires after each slider animation completes.

      if (fireState == 'start' || fireState == 'after') {
        //Remove the slider loading
        //-------------------------------------
        thisSlider.removeClass(prefix + '-flexslider-loading'); //With Timeline
        //-------------------------------------	

        if (dataTimeline && dataTimeline != '') {
          var curPerMinWidth = curIndex / count * 100 + '%',
              curPerMaxWidth = (curIndex + 1) / count * 100 + '%',
              curTotalWidth = $(dataTimeline).width(); //Fires animation effect of an element width.

          $(dataTimeline).find('> span').css({
            'width': curTotalWidth,
            'transition': 'all ' + parseFloat(thisSlider.vars.slideshowSpeed - thisSlider.vars.animationSpeed) + 'ms linear'
          });
        } //Display Next/Prev image thumbnail in navigation
        //-------------------------------------		


        if (dataPNThumbs && dataPNThumbs != '') {
          var prevIndex = curIndex - 1,
              nextIndex = thisSlider.animatingTo + 1,
              pimg = '',
              nimg = '',
              $plink = $(dataPNThumbs + '> a'),
              $plinkPrev = $plink.filter('.uix-flexslider__mycontrols--thumb__prev'),
              $plinkNext = $plink.filter('.uix-flexslider__mycontrols--thumb__next');
          $plinkPrev.removeClass('is-disabled');
          $plinkNext.removeClass('is-disabled');

          if (!thisSlider.vars.animationLoop) {
            if (prevIndex === -1) $plinkPrev.addClass('is-disabled');
            if (nextIndex === thisSlider.last + 1) $plinkNext.addClass('is-disabled');
          } else {
            if (prevIndex === -1) prevIndex = thisSlider.last;
            if (nextIndex === thisSlider.last + 1) nextIndex = 0;
          } //Get images URL


          pimg = thisSlider.slides.eq(prevIndex).find('img').attr('src');
          nimg = thisSlider.slides.eq(nextIndex).find('img').attr('src');

          if ($(dataPNThumbs).length > 0) {
            $plink.attr('href', 'javascript:void(0);');
            if (flexslider_js_typeof(pimg) != ( true ? "undefined" : undefined)) $plinkPrev.attr('data-goto', prevIndex).find('> span').html('<img src="' + pimg + '" alt="">');
            if (flexslider_js_typeof(nimg) != ( true ? "undefined" : undefined)) $plinkNext.attr('data-goto', nextIndex).find('> span').html('<img src="' + nimg + '" alt="">');
            $plink.off('click').off('click').on('click', function (e) {
              e.preventDefault();
              thisSlider.flexslider(parseInt($(this).attr('data-goto')));
            });
          }
        } // Fires local videos asynchronously with slider switch.
        //-------------------------------------


        videoEmbedInit($items, false);
        videoEmbedInit($current, true); //Auto-restart player if paused after action
        //-------------------------------------

        if (thisSlider.vars.slideshow) {
          if (!thisSlider.playing) {
            thisSlider.play();
          }
        } //Prevent to <a> of page transitions
        //-------------------------------------


        $('a').each(function () {
          var attr = $(this).attr('href');

          if (flexslider_js_typeof(attr) === ( true ? "undefined" : undefined)) {
            $(this).attr('href', '#');
          }
        }); //Thumbnail ControlNav Pattern
        //-------------------------------------

        if (dataNhumbs && dataNhumbs != '') {
          $('.uix-flexslider__thumbs' + dataNhumbs + ' > ul > li').removeClass('is-active');
          $('.uix-flexslider__thumbs' + dataNhumbs + ' > ul > li').eq(curIndex).addClass('is-active');
        } //Initialize items background of the slider
        //-------------------------------------


        thisSlider.find('[data-slider-bg]').each(function () {
          $(this).css('background-image', 'url(' + $(this).data('slider-bg') + ')');
        }); //Enable "prettyPhoto" plugin
        //-------------------------------------

        if ($.isFunction($.fn.lightbox)) {
          thisSlider.slides.find("a[rel^='theme-slider-prettyPhoto']").lightbox();
        } //Return an event from callback function to each slider 
        //with dynamic min/max ranges.
        //-------------------------------------


        if (flexslider_js_typeof(dataShowItems) != ( true ? "undefined" : undefined) && dataShowItems != '' && dataShowItems != 0) {
          if (dataShowItemsMove == 1) {
            $items.removeClass(activeClass);
            $items.removeClass(prevClass);
            $items.removeClass(nextClass);

            if (windowWidth <= 768) {
              //Focus slider
              $items.eq(parseFloat(curIndex)).addClass(activeClass);
            } else {
              //Focus slider
              $items.eq(parseFloat(curIndex + 1)).addClass(activeClass); //Previous slider

              $items.eq(parseFloat(curIndex)).addClass(prevClass); //Next slider

              $items.eq(parseFloat(curIndex + 2)).addClass(nextClass);
            }
          } else {
            $items.addClass(activeClass);
          }
        } //Display counter
        //-------------------------------------


        if (sliderWrapper.find('.uix-flexslider__mycontrols__count').length == 0) {
          if (sliderWrapper.closest('section').find('.uix-flexslider__mycontrols__count').length > 0) {
            var showCountTotal = count,
                showCountCur = curIndex + 1;
            if (showCountTotal < 10) showCountTotal = '0' + showCountTotal;
            if (showCountCur < 10) showCountCur = '0' + showCountCur;
            countTotalSelector.text(showCountTotal);
            countCurSelector.text(showCountCur);
          }
        }
      } // Fires asynchronously with each slider animation.


      if (fireState == 'before') {
        //Common images style
        //-------------------------------------	
        $next.find('img').addClass('is-active');
        $current.find('img').removeClass('is-active');
        $prev.find('img').removeClass('is-active');
        $first.find('img').removeClass('is-active'); //With Timeline
        //-------------------------------------	

        if (dataTimeline && dataTimeline != '') {
          //Fires animation effect of an element width.
          $(dataTimeline).find('> span').css({
            'width': 0,
            'transition': 'all 100ms linear'
          });
        }
      } // Fires when the slider reaches the last slide (asynchronous).


      if (fireState == 'end') {
        //Common images style
        //-------------------------------------	
        $first.find('img').addClass('is-active');
      } // Fires asynchronously with each slider animation.
      // Fires when the slider loads the first slide.


      if (fireState == 'before' || fireState == 'start') {
        //Return an event from callback function to each slider to make parallax effect.
        //-------------------------------------
        if (dataParallax) {
          var dir = 'uix-flexslider__item--left';
          $.each(thisSlider.slides, function (i, item) {
            var el = $(item);
            el.removeClass('uix-flexslider__item--right uix-flexslider__item--left');

            if (i >= thisSlider.animatingTo && dir !== 'uix-flexslider__item--right') {
              dir = 'uix-flexslider__item--right';
            } else {
              el.addClass(dir);
            }
          });
        }
      }

      return curIndex;
    }
    /*
     * Initialize embedded local video.
     *
     * @param  {Element} wrapper          - The outermost video container, which can contain multiple videos
     * @param  {Boolean} play            - Forced to trigger pause or play events.
     * @return {Void}
     */


    function videoEmbedInit(wrapper, play) {
      wrapper.find('.uix-video__slider').each(function () {
        var $this = $(this);
        var videoWrapperW = $this.closest('[data-embed-video-wrapper]').width(),
            curVideoID = $this.find('video').attr('id') + '-slider-videopush',
            coverPlayBtnID = 'videocover-' + curVideoID,
            $replayBtn = $('#' + curVideoID + '-replay-btn');
        var dataControls = $this.data('embed-video-controls'),
            dataAuto = $this.data('embed-video-autoplay'),
            dataLoop = $this.data('embed-video-loop'),
            dataW = $this.data('embed-video-width'),
            dataH = $this.data('embed-video-height'); //Push a new ID to video
        //Solve the problem that ajax asynchronous loading does not play

        $this.find('.video-js').attr('id', curVideoID);

        if (flexslider_js_typeof(dataAuto) === ( true ? "undefined" : undefined)) {
          dataAuto = true;
        }

        if (flexslider_js_typeof(dataLoop) === ( true ? "undefined" : undefined)) {
          dataLoop = true;
        }

        if (flexslider_js_typeof(dataControls) === ( true ? "undefined" : undefined)) {
          dataControls = false;
        }

        if (flexslider_js_typeof(dataW) === ( true ? "undefined" : undefined) || dataW == 'auto') {
          dataW = videoWrapperW;
        }

        if (flexslider_js_typeof(dataH) === ( true ? "undefined" : undefined) || dataH == 'auto') {
          dataH = videoWrapperW / 1.77777777777778;
        } //Display cover and play buttons when some mobile device browsers cannot automatically play video


        if ($('#' + coverPlayBtnID).length == 0) {
          $('<div id="' + coverPlayBtnID + '" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url(' + $this.find('video').attr('poster') + ')"></span><span class="uix-video__cover__playbtn"></span></div>').insertBefore($this);
          var btnEv = Modernizr.touchevents ? 'touchstart' : 'click';
          $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').on(btnEv, function (e) {
            e.preventDefault();
            myPlayer.play();
            $('#' + coverPlayBtnID).hide();
          });
        } //Add replay button to video 


        if ($replayBtn.length == 0) {
          $this.after('<span class="uix-video__btn-play" id="' + curVideoID + '-replay-btn"></span>');
        } //HTML5 video autoplay on mobile revisited


        if (dataAuto && windowWidth <= 768) {
          $this.find('.video-js').attr({
            'autoplay': 'true',
            'muted': 'true',
            'playsinline': 'true'
          });
        }

        var myPlayer = videojs(curVideoID, {
          width: dataW,
          height: dataH,
          loop: dataLoop,
          autoplay: dataAuto
        }, function onPlayerReady() {
          var initVideo = function initVideo(obj) {
            //Get Video Dimensions
            var curW = obj.videoWidth(),
                curH = obj.videoHeight(),
                newW = curW,
                newH = curH;
            newW = videoWrapperW; //Scaled/Proportional Content 

            newH = curH * (newW / curW);

            if (!isNaN(newW) && !isNaN(newH)) {
              obj.height(newH);
              obj.width(newW);
              $this.css('height', newH);
            } //Show this video wrapper


            $this.css('visibility', 'visible'); //Hide loading effect

            $this.find('.vjs-loading-spinner, .vjs-big-play-button').hide();
          };
          /* ---------  Video initialize */


          this.on('loadedmetadata', function () {
            initVideo(this);
          });
          /* ---------  Display the play button  */

          if (!dataAuto) $this.find('.vjs-big-play-button').show();
          $this.find('.vjs-big-play-button').off('click').on('click', function () {
            $(this).hide();
          });
          /* ---------  Set, tell the player it's in fullscreen  */

          if (dataAuto) {
            //Fix an error of Video auto play is not working in browser
            //this.muted( true ); 
            //Prevent autoplay error: Uncaught (in promise) DOMException
            var promise = this.play();

            if (promise !== undefined) {
              promise.then(function () {// Autoplay started!
              })["catch"](function (error) {
                // Autoplay was prevented.
                $('#' + coverPlayBtnID).show();
                $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                console.log('Autoplay was prevented.');
              });
            }
          }
          /* ---------  Disable control bar play button click */


          if (!dataControls) {
            this.controls(false);
          }
          /* ---------  Determine if the video is auto played from mobile devices  */


          var autoPlayOK = false;
          this.on('timeupdate', function () {
            var duration = this.duration();

            if (duration > 0) {
              autoPlayOK = true;

              if (this.currentTime() > 0) {
                autoPlayOK = true;
                this.off('timeupdate'); //Hide cover and play buttons when the video automatically played

                $('#' + coverPlayBtnID).hide();
              }
            }
          });
          /* ---------  Pause the video when it is not current slider  */

          if (!play) {
            this.pause();
            this.currentTime(0);
          } else {
            if (dataAuto) {
              this.currentTime(0); //Prevent autoplay error: Uncaught (in promise) DOMException

              var _promise = this.play();

              if (_promise !== undefined) {
                _promise.then(function () {// Autoplay started!
                })["catch"](function (error) {
                  // Autoplay was prevented.
                  $('#' + coverPlayBtnID).show();
                  $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                  console.log('Autoplay was prevented.');
                });
              } //Hidden replay button


              $replayBtn.hide(); //Should the video go to the beginning when it ends

              this.on('ended', function () {
                if (dataLoop) {
                  this.currentTime(0);
                  this.play();
                } else {
                  //Replay this video
                  this.currentTime(0);
                  $replayBtn.show().off('click').on('click', function (e) {
                    e.preventDefault();
                    this.play();
                    $replayBtn.hide();
                  });
                }
              });
            }
          }
        });
      });
    }
    /*
     * Make slider image draggable 
     *
     * @param  {Element} $obj             - The current FlexSlider setup using custom selector.
     * @return {Void}
     */


    function slidesExDraggable($obj) {
      var $dragDropTrigger = $obj.find('.uix-flexslider__inner > div.uix-flexslider__item'); //Make the cursor a move icon when a user hovers over an item

      $dragDropTrigger.css('cursor', 'move'); //Mouse event

      $dragDropTrigger.on('mousedown', function (e) {
        e.preventDefault();

        if ($obj.data('flexslider').animating) {
          return;
        }

        $(this).addClass('is-dragging');
        $(this).data('origin_mouse_x', parseInt(e.pageX));
        $(this).data('origin_mouse_y', parseInt(e.pageY));
      }).on('mouseup', function (e) {
        e.preventDefault();

        if ($obj.data('flexslider').animating) {
          return;
        }

        $(this).removeClass('is-dragging');
        var origin_mouse_x = $(this).data('origin_mouse_x'),
            origin_mouse_y = $(this).data('origin_mouse_y');

        if ('horizontal' === $obj.data('flexslider').vars.direction) {
          //right
          if (e.pageX > origin_mouse_x) {
            $obj.flexslider('prev');
          } //left


          if (e.pageX < origin_mouse_x) {
            $obj.flexslider('next');
          }
        } else {
          //down
          if (e.pageY > origin_mouse_y) {
            $obj.flexslider('prev');
          } //up


          if (e.pageY < origin_mouse_y) {
            $obj.flexslider('next');
          }
        }
      });
    }
    /*
     *  Scroll The Slider With Mousewheel
     *
     * @param  {Element} $obj            - The current FlexSlider setup using custom selector.
     * @return {Void}
     */


    function slidesExMousewheel($obj) {
      var timer = null,
          wheeling = false;
      $obj[0].addEventListener('wheel', function (e) {
        //Gets a value that indicates the amount that the mouse wheel has changed.
        var delta = Math.max(-1, Math.min(1, -e.deltaY));

        if (timer) {
          clearTimeout(timer);
        }

        if (!wheeling) {
          if (delta < 0) {
            //scroll down
            $obj.flexslider('next');
          } else {
            //scroll up
            $obj.flexslider('prev');
          }
        }

        wheeling = true;
        timer = setTimeout(function () {
          wheeling = false;
        }, 60);
      }, browser.supportsPassive ? {
        passive: true
      } : false);
    }
    /*
     * Slider With Thumbnail ControlNav Pattern
     *
     * @param  {Element} slider           - The current slider.
     * @param  {String} navThumbClass    - Class name of thumbnail controlNav.
     * @return {Void}
     */


    function initslidesWithNavThumb(slider, navThumbClass) {
      $('.uix-flexslider__thumbs' + navThumbClass + ' > ul > li').off('click').on('click', function () {
        $('.uix-flexslider__thumbs' + navThumbClass + ' > ul > li').removeClass('is-active');
        $(this).addClass('is-active');
        slider.flexslider($(this).index());
      });
    }
    /*
    * Method that updates children slides
    * fortunately, since all the children are not animating,
    * they will only update if the main flexslider updates. 
     *
     * @param  {Number} slideNumber          - The current slider index.
     * @param  {Element} childrenSlidesObj    - Target slider.
     * @param  {Boolean} loop                - Gives the slider a seamless infinite loop.
     * @param  {Number} speed                - Set the speed of animations, in milliseconds.
     * @param  {Number} timing               - Set the speed of the slideshow cycling, in milliseconds.
     * @return {Void}
     */


    function updateChildrenSlides(slideNumber, childrenSlidesObj, loop, speed, timing) {
      /** 
      * Create the children flexsliders. Must be array of jquery objects with the
      * flexslider data. Easiest way is to place selector group in a var.
      */
      var childrenSlides = $(childrenSlidesObj).flexslider({
        slideshow: false,
        // Remove the animations
        controlNav: false,
        // Remove the controls
        animationLoop: loop,
        animationSpeed: speed,
        slideshowSpeed: timing
      }); // Iterate through the children slides but not past the max

      for (var i = 0; i < childrenSlides.length; i++) {
        // Run the animate method on the child slide
        $(childrenSlides[i]).data('flexslider').flexAnimate(slideNumber);
      }
    }
    /*! 
     ---------------------------
           Initialize slideshow
     ---------------------------
     */


    var $sliderDefault = $('.uix-flexslider');
    $sliderDefault.each(function () {
      var $this = $(this);
      var dataSpeed = $this.data('speed'),
          dataDrag = $this.data('draggable'),
          dataWheel = $this.data('wheel'),
          dataTiming = $this.data('timing'),
          dataLoop = $this.data('loop'),
          dataPrev = $this.data('prev'),
          dataNext = $this.data('next'),
          dataAnim = $this.data('animation'),
          dataPaging = $this.data('paging'),
          dataArrows = $this.data('arrows'),
          dataAuto = $this.data('auto'),
          dataNhumbs = $this.data('my-nav-thumbs'),
          dataPNThumbs = $this.data('my-prev-next-thumbs'),
          dataTimeline = $this.data('my-nav-timeline'),
          dataCountTotal = $this.data('my-count-total'),
          dataCountCur = $this.data('my-count-now'),
          customConID = $this.data('my-controls'),
          dataShowItems = $this.data('my-multiple-items'),
          dataShowItemsMove = $this.data('my-multiple-items-move'),
          dataParallax = $this.data('my-parallax'),
          dataSync = $this.data('my-sync'); //Fires local videos asynchronously with slider switch.

      videoEmbedInit($this.find('.uix-flexslider__item'), false); // Custom Controls

      var myControlsContainer, myCustomDirectionNav;

      if (flexslider_js_typeof(customConID) === ( true ? "undefined" : undefined) || customConID == '' || customConID == false) {
        myControlsContainer = '';
        myCustomDirectionNav = '';
      } else {
        myControlsContainer = $('.uix-flexslider__mycontrols' + customConID + ' .uix-flexslider__mycontrols__control-paging');
        myCustomDirectionNav = $('.uix-flexslider__mycontrols' + customConID + ' a');
      } // If there is no data-xxx, save current source to it


      if (flexslider_js_typeof(dataSpeed) === ( true ? "undefined" : undefined)) dataSpeed = 600;
      if (flexslider_js_typeof(dataTiming) === ( true ? "undefined" : undefined)) dataTiming = 10000;
      if (flexslider_js_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = true;
      if (flexslider_js_typeof(dataPrev) === ( true ? "undefined" : undefined)) dataPrev = "<i class='fa fa-chevron-left'></i>";
      if (flexslider_js_typeof(dataNext) === ( true ? "undefined" : undefined)) dataNext = "<i class='fa fa-chevron-right'></i>";
      if (flexslider_js_typeof(dataAnim) === ( true ? "undefined" : undefined)) dataAnim = 'slide';
      if (flexslider_js_typeof(dataPaging) === ( true ? "undefined" : undefined)) dataPaging = true;
      if (flexslider_js_typeof(dataArrows) === ( true ? "undefined" : undefined)) dataArrows = true;
      if (flexslider_js_typeof(dataAuto) === ( true ? "undefined" : undefined)) dataAuto = true;
      if (flexslider_js_typeof(dataDrag) === ( true ? "undefined" : undefined)) dataDrag = false;
      if (flexslider_js_typeof(dataWheel) === ( true ? "undefined" : undefined)) dataWheel = false;
      if (flexslider_js_typeof(dataNhumbs) === ( true ? "undefined" : undefined)) dataNhumbs = false;
      if (flexslider_js_typeof(dataPNThumbs) === ( true ? "undefined" : undefined)) dataPNThumbs = false;
      if (flexslider_js_typeof(dataTimeline) === ( true ? "undefined" : undefined)) dataTimeline = false;
      if (flexslider_js_typeof(dataCountTotal) === ( true ? "undefined" : undefined)) dataCountTotal = false;
      if (flexslider_js_typeof(dataCountCur) === ( true ? "undefined" : undefined)) dataCountCur = false;
      if (flexslider_js_typeof(dataParallax) === ( true ? "undefined" : undefined)) dataParallax = false;
      if (flexslider_js_typeof(dataShowItemsMove) === ( true ? "undefined" : undefined)) dataShowItemsMove = 1; //Make slider image draggable 

      if (dataDrag) slidesExDraggable($this); //Scroll The Slider With Mousewheel

      if (dataWheel) slidesExMousewheel($this); //With Thumbnail ControlNav Pattern

      if (dataNhumbs) {
        initslidesWithNavThumb($this, dataNhumbs); //Prevent index error

        dataLoop = false;
      } //Show number of items


      var my_itemWidth = 0,
          my_move = dataShowItemsMove,
          my_minItems = 0,
          my_maxItems = 0;

      if (flexslider_js_typeof(dataShowItems) != ( true ? "undefined" : undefined) && dataShowItems != '' && dataShowItems != 0) {
        my_itemWidth = 1;
        my_minItems = getGridSize(dataShowItems);
        my_maxItems = getGridSize(dataShowItems);
      } // Determine if this slider is added with a synchronization event


      $('[data-my-sync]').each(function () {
        var curSync = $(this).data('my-sync');
        var thisSliderID = $this.attr('id');

        if (flexslider_js_typeof(curSync) != ( true ? "undefined" : undefined)) {
          curSync = curSync.toString().replace('#', '').replace('.', '');
        }

        if (flexslider_js_typeof(thisSliderID) != ( true ? "undefined" : undefined) && thisSliderID == curSync) {
          dataAuto = false; //Set it not to scroll automatically

          dataPaging = false; // break out of jQuery each Loop

          return false;
        }
      });
      $this.flexslider({
        namespace: 'uix-flexslider__',
        animation: dataAnim,
        selector: '.uix-flexslider__inner > div.uix-flexslider__item',
        controlNav: dataPaging,
        smoothHeight: true,
        prevText: dataPrev,
        nextText: dataNext,
        animationSpeed: dataSpeed,
        slideshowSpeed: dataTiming,
        slideshow: dataAuto,
        animationLoop: dataLoop,
        directionNav: dataArrows,
        itemWidth: my_itemWidth,
        move: my_move,
        // Number of carousel items that should move on animation.
        minItems: my_minItems,
        // use function to pull in initial value
        maxItems: my_maxItems,
        // use function to pull in initial value
        controlsContainer: myControlsContainer,
        customDirectionNav: myCustomDirectionNav,
        //Fires when the slider loads the first slide.
        start: function start(slider) {
          //set slider instance to flexslider variable
          if (flexslider_js_typeof(dataShowItems) != ( true ? "undefined" : undefined) && dataShowItems != '' && dataShowItems != 0) {
            flexslider = slider;
          }

          initslides($this, slider, 'start');
        },
        //Fires asynchronously with each slider animation.
        before: function before(slider) {
          initslides($this, slider, 'before'); // Call the updateChildrenSlides which itterates through all children slides 

          if (flexslider_js_typeof(dataSync) != ( true ? "undefined" : undefined) && dataSync != '' && dataSync != 0) {
            updateChildrenSlides(slider.animatingTo, dataSync, dataLoop, dataSpeed, dataTiming);
          }
        },
        //Fires after each slider animation completes.
        after: function after(slider) {
          initslides($this, slider, 'after');
        },
        //Fires when the slider reaches the last slide (asynchronous).
        end: function end(slider) {
          initslides($this, slider, 'end');
        }
      });
    });
    /*! 
     ---------------------------
           Check grid size on resize event
     ---------------------------
     */

    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;
        $sliderDefault.each(function () {
          if ($(this).length > 0) {
            // check grid size on resize event
            var dataShowItems = $(this).data('my-multiple-items');

            if (flexslider_js_typeof(dataShowItems) != ( true ? "undefined" : undefined) && dataShowItems != '' && dataShowItems != 0) {
              var gridSize = getGridSize(dataShowItems);
              flexslider.vars.minItems = gridSize;
              flexslider.vars.maxItems = gridSize;
            }

            $(this).data('flexslider').setup();
          }
        });
      }
    });
  };

  module.components.documentReady.push(module.FLEXSLIDER.documentReady);
  return function FLEXSLIDER() {
    flexslider_js_classCallCheck(this, FLEXSLIDER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/floating-side-element/scss/_style.scss
var floating_side_element_scss_style = __webpack_require__(21);

// CONCATENATED MODULE: ./src/components/ES6/floating-side-element/js/index.js
function floating_side_element_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Floating Side Element -->
 *************************************
 */


var FLOATING_SIDE_EL = function (module, $, window, document) {
  if (window.FLOATING_SIDE_EL === null) return false;
  module.FLOATING_SIDE_EL = module.FLOATING_SIDE_EL || {};
  module.FLOATING_SIDE_EL.version = '0.0.5';

  module.FLOATING_SIDE_EL.documentReady = function ($) {
    var documentHeight = 0,
        $floatingSideEl = $('.uix-floating-side-el'),
        floatingOffset = $floatingSideEl.offset(); //Prevent this module from loading in other pages

    if ($floatingSideEl.length == 0) return false;
    documentHeight = $(document).height(); //Init position

    TweenMax.to($floatingSideEl, 0.3, {
      css: {
        marginTop: -floatingOffset.top + ($(window).height() - $floatingSideEl.height()) / 2
      }
    });
    $(window).off('scroll.FLOATING_SIDE_EL touchmove.FLOATING_SIDE_EL').on('scroll.FLOATING_SIDE_EL touchmove.FLOATING_SIDE_EL', function () {
      var sideBarHeight = $floatingSideEl.height(),
          scrolled = $(this).scrollTop();
      documentHeight = $(document).height();

      if (scrolled > floatingOffset.top) {
        var newPosition = scrolled - floatingOffset.top,
            maxPosition = documentHeight - sideBarHeight;

        if (newPosition > maxPosition) {
          newPosition = maxPosition;
        }

        TweenMax.to($floatingSideEl, 0.3, {
          css: {
            marginTop: newPosition + (window.innerHeight - sideBarHeight) / 2
          }
        });
      } else {
        TweenMax.to($floatingSideEl, 0.3, {
          css: {
            marginTop: 0
          }
        });
      }
    });
  };

  module.components.documentReady.push(module.FLOATING_SIDE_EL.documentReady);
  return function FLOATING_SIDE_EL() {
    floating_side_element_js_classCallCheck(this, FLOATING_SIDE_EL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/form-progress/js/fn/form-progress-to-next.js
var form_progress_to_next = __webpack_require__(22);

// EXTERNAL MODULE: ./src/components/ES6/form-progress/scss/_style.scss
var form_progress_scss_style = __webpack_require__(23);

// CONCATENATED MODULE: ./src/components/ES6/form-progress/js/index.js
function form_progress_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function form_progress_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { form_progress_js_typeof = function _typeof(obj) { return typeof obj; }; } else { form_progress_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return form_progress_js_typeof(obj); }

/* 
 *************************************
 * <!-- Form Progress -->
 *************************************
 */

/*
    Note:
	
	If you want to initialize the indicator to a location when the page is first run,
	you need to call the following function:
	
	$( 'body' ).waitForImages().done(function() {
		$( document ).UixFormProgressToNext({ 
			'selector'         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
			'formTarget'       : $( '.uix-form-progress__target' ),
			'indicator'        : '.uix-form-progress .uix-form-progress__indicator',
			'index'            : 0
		});
	});


*/



var FORM_PROGRESS = function (module, $, window, document) {
  if (window.FORM_PROGRESS === null) return false;
  module.FORM_PROGRESS = module.FORM_PROGRESS || {};
  module.FORM_PROGRESS.version = '0.0.3';

  module.FORM_PROGRESS.pageLoaded = function () {
    var $progressBar = $('.uix-form-progress progress'),
        $formTarget = $('.uix-form-progress__target'),
        $indicator = $('.uix-form-progress .uix-form-progress__indicator'),
        formAreaH = $formTarget.height(),
        allStep = $indicator.length,
        stepPerValue = 100 / (allStep - 1),
        value = 0,
        transitionEnd = 'webkitTransitionEnd transitionend'; //Get form transition speed

    var dur = $formTarget.data('anime-speed');

    if (form_progress_js_typeof(dur) === ( true ? "undefined" : undefined)) {
      dur = '0.5s';
    }

    var durString = dur.toLowerCase(),
        isMS = durString.indexOf('ms') >= 0,
        numberNum = durString.replace('ms', '').replace('s', ''),
        animeSpeed = isMS ? numberNum : numberNum * 1000; //Gets the party started.

    formReset(); //Display the target

    setTimeout(function () {
      $formTarget.addClass('is-active');
    }, parseFloat(dur) * 1000); // Show next form on continue click

    $(document).off('click.FORM_PROGRESS').on('click.FORM_PROGRESS', '.uix-form-progress__target .go-step:not(.disable)', function (e) {
      e.preventDefault();
      var $sections = $(this).parents('.uix-form-progress__target__step');
      $(document).UixFormProgressToNext({
        'selector': $('.uix-form-progress__target .uix-form-progress__target__step'),
        'formTarget': $formTarget,
        'indicator': '.uix-form-progress .uix-form-progress__indicator',
        'index': $sections.index() + 1
      }); //Scroll Top

      TweenMax.to(window, 0.5, {
        scrollTo: {
          y: 0,
          autoKill: false
        },
        ease: Power2.easeOut
      });
    }); // Reset form on reset button click

    $(document).off('click.FORM_PROGRESS_RESET').on('click.FORM_PROGRESS_RESET', '.uix-form-progress__target .go-reset', function (e) {
      e.preventDefault();
      formReset();
    });
    /*
     * Resets the form back to the default state.
     *
     * @return {Void}
     */

    function formReset() {
      $(document).UixFormProgressToNext({
        'selector': $('.uix-form-progress__target .uix-form-progress__target__step'),
        'formTarget': $('.uix-form-progress__target'),
        'indicator': '.uix-form-progress .uix-form-progress__indicator',
        'index': 0
      });
    }
  };

  module.components.pageLoaded.push(module.FORM_PROGRESS.pageLoaded);
  return function FORM_PROGRESS() {
    form_progress_js_classCallCheck(this, FORM_PROGRESS);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/normal-radio.js
var normal_radio = __webpack_require__(24);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/datapicker.js
var datapicker = __webpack_require__(25);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/controls-hover.js
var controls_hover = __webpack_require__(26);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/single-seletor.js
var single_seletor = __webpack_require__(27);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/multi-seletor.js
var multi_seletor = __webpack_require__(28);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/file-dropzone.js
var file_dropzone = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/upload.js
var upload = __webpack_require__(30);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/controls-disable.js
var controls_disable = __webpack_require__(31);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/controls-line.js
var controls_line = __webpack_require__(32);

// EXTERNAL MODULE: ./src/components/ES6/form/js/fn/radio-and-checkbox.js
var radio_and_checkbox = __webpack_require__(33);

// EXTERNAL MODULE: ./src/components/ES6/form/scss/_basic.scss
var scss_basic = __webpack_require__(34);

// EXTERNAL MODULE: ./src/components/ES6/form/scss/_layout.scss
var _layout = __webpack_require__(35);

// EXTERNAL MODULE: ./src/components/ES6/form/scss/_theme_material.scss
var _theme_material = __webpack_require__(36);

// EXTERNAL MODULE: ./src/components/ES6/form/scss/_3rd_party_plugins.scss
var _3rd_party_plugins = __webpack_require__(37);

// CONCATENATED MODULE: ./src/components/ES6/form/js/index.js
function form_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function form_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { form_js_typeof = function _typeof(obj) { return typeof obj; }; } else { form_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return form_js_typeof(obj); }

/* 
 *************************************
 * <!-- Form -->
 *************************************
 */

/**
 * module.FORM
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */

/*
    Note:
	
	If you use the "change" event to asynchronously change a custom control of select, radio or checkbox, 
	you need add a callback function that initializes the style:
	

	$( document ).UixRenderCustomSelect(); //Render Custom Select
	$( document ).UixRenderCustomRadioCheckbox(); //Render Custom Radio, Toggle And Checkbox
	$( document ).UixRenderControlsLineEff(); //Create Line Effect on Click
	$( document ).UixRenderControlsDisable(); //Disabled Controls Status
	$( document ).UixRenderCustomFile(); //Render Custom File Type
	$( document ).UixRenderCustomFileDropzone(); //Render Custom File Dropzone
	$( document ).UixRenderControlsHover(); //Hover Effect
	$( document ).UixRenderCustomMultiSel(); //Render Multiple Selector Status
	$( document ).UixRenderCustomSingleSel(); //Render Single Selector Status
	$( document ).UixRenderNormalRadio(); //Render Normal Radio Status
	$( document ).UixRenderDatePicker(); //Render Date Picker

	
*/
















var FORM = function (module, $, window, document) {
  if (window.FORM === null) return false;
  module.FORM = module.FORM || {};
  module.FORM.version = '0.1.75';

  module.FORM.documentReady = function ($) {
    /*
     * Callbacks for special forms (supports asynchronous)
     * Add this code to initialize the style when calling 
     * the form externally with other scripts
     *
     * @return {Void}
     */
    var customSpecialFormsInit = function customSpecialFormsInit() {
      $(document).UixRenderCustomSelect(); //Render Custom Select

      $(document).UixRenderCustomRadioCheckbox(); //Render Custom Radio, Toggle And Checkbox

      $(document).UixRenderControlsLineEff(); //Create Line Effect on Click

      $(document).UixRenderControlsDisable(); //Disabled Controls Status

      $(document).UixRenderCustomFile(); //Render Custom File Type

      $(document).UixRenderCustomFileDropzone(); //Render Custom File Dropzone

      $(document).UixRenderControlsHover(); //Hover Effect

      $(document).UixRenderCustomMultiSel(); //Render Multiple Selector Status

      $(document).UixRenderCustomSingleSel(); //Render Single Selector Status

      $(document).UixRenderNormalRadio(); //Render Normal Radio Status

      $(document).UixRenderDatePicker(); //Render Date Picker	
    };

    customSpecialFormsInit();
    /* 
     ---------------------------
     Click Event of Submit Button
     ---------------------------
     */
    //Search Submit Event in WordPress

    $('.uix-search-box__submit').off('click').on('click', function () {
      $(this).closest('form').submit();
    });
    /* 
     ---------------------------
     Click Event of add / remove input field dynamically
     ---------------------------
     */

    $('.uix-controls__dynamic-fields-container').each(function () {
      var $this = $(this);
      var $addButton = $this.find('.uix-controls__dynamic-fields__addbtn'),
          //The add button
      removeButton = '.uix-controls__dynamic-fields__removebtn',
          //The remove button selector ID or class
      $appendWrapper = $this.find('.uix-controls__dynamic-fields__append'); //The field wrapper ID or class 

      var x = 1,
          maxField = $this.data('max-fields'),
          fieldHTML = ''; //Maximum number of forms added

      if (form_js_typeof(maxField) === ( true ? "undefined" : undefined)) {
        maxField = 5;
      } //Add a field


      var addOne = function addOne(fieldCode) {
        //replace the index of field name
        fieldCode = fieldCode.replace(/\{index\}/gi, x); //hide add button

        if (x == maxField) $addButton.hide();

        if (x <= maxField) {
          $appendWrapper.append(fieldCode);
          $.when($appendWrapper.length > 0).then(function () {
            //Initialize Form
            customSpecialFormsInit();
          });
          x++;
        }
      };

      addOne($this.find('.uix-controls__dynamic-fields__tmpl').html()); //Prevent duplicate function assigned

      $addButton.off('click').off('click').on('click', function (e) {
        e.preventDefault();
        addOne($this.find('.uix-controls__dynamic-fields__tmpl').html());
        return false;
      }); //Remove per item
      //Prevent duplicate function assigned

      $(document).off('click.FORM_DYNAMIC_FIELDS').on('click.FORM_DYNAMIC_FIELDS', removeButton, function (e) {
        e.preventDefault(); //display add button

        $addButton.show();
        var $li = $(this).closest('.uix-controls__dynamic-fields__tmpl__wrapper');

        if ($this.find('.uix-controls__dynamic-fields .uix-controls__dynamic-fields__tmpl__wrapper').length == 1) {
          $li.find('input, textarea').val('');
          $li.hide();
        } else {
          $li.remove();
        }

        x--;
      });
    });
    /* 
     ---------------------------
     Click Event of Custom Input Number 
     ---------------------------
     */

    $(document).off('click.FORM_NUMBER_BTN_ADD').on('click.FORM_NUMBER_BTN_ADD', '.uix-controls__number__btn--add', function (e) {
      var step = parseFloat($(this).data('step')),
          decimals = $(this).data('decimals'),
          $numberInput = $(this).closest('.uix-controls__number').find('input[type="number"]'),
          numberInputVal = parseFloat($numberInput.val()),
          max = $numberInput.attr('max');
      if (form_js_typeof(step) === ( true ? "undefined" : undefined) || isNaN(step)) step = 1;
      if (form_js_typeof(decimals) === ( true ? "undefined" : undefined)) decimals = 0;

      if (form_js_typeof(max) != ( true ? "undefined" : undefined) && parseFloat(numberInputVal + step) > max) {
        step = 0;
      }

      numberInputVal = parseFloat(numberInputVal + step);
      $numberInput.val(numberInputVal.toFixed(decimals));
    });
    $(document).off('click.FORM_NUMBER_BTN_REMOVE').on('click.FORM_NUMBER_BTN_REMOVE', '.uix-controls__number__btn--remove', function (e) {
      var step = $(this).data('step'),
          decimals = $(this).data('decimals'),
          $numberInput = $(this).closest('.uix-controls__number').find('input[type="number"]'),
          numberInputVal = parseFloat($numberInput.val()),
          min = $numberInput.attr('min');
      if (form_js_typeof(step) === ( true ? "undefined" : undefined) || isNaN(step)) step = 1;
      if (form_js_typeof(decimals) === ( true ? "undefined" : undefined)) decimals = 0;

      if (form_js_typeof(min) != ( true ? "undefined" : undefined) && parseFloat(numberInputVal - step) < min) {
        step = 0;
      }

      numberInputVal -= step;
      $numberInput.val(numberInputVal.toFixed(decimals));
    });
    /* 
     ---------------------------
     Click Event of Multiple Selector
     ---------------------------
     */

    var multiSel = '.uix-controls__multi-sel',
        multiSelItem = multiSel + ' > span';
    $(document).off('click.FORM_MULTI_SEL').on('click.FORM_MULTI_SEL', multiSelItem, function (e) {
      e.preventDefault();
      var $selector = $(this).parent(),
          $option = $(this),
          targetID = '#' + $selector.data("targetid"),
          curVal = $option.data('value'),
          tarVal = $(targetID).val() + ',',
          resVal = '';
      $option.toggleClass('is-active').attr('aria-checked', function (index, attr) {
        return attr == 'true' ? false : true;
      });

      if (tarVal.indexOf(curVal + ',') < 0) {
        resVal = tarVal + curVal + ',';
      } else {
        resVal = tarVal.replace(curVal + ',', '');
      }

      resVal = resVal.replace(/,\s*$/, '').replace(/^,/, '');
      $(targetID).val(resVal); //Dynamic listening for the latest value

      $(targetID).focus().blur();
    });
    /* 
     ---------------------------
     Click Event of Single Selector
     ---------------------------
     */

    var singleSel = '.uix-controls__single-sel',
        singleSelItem = singleSel + ' > span';
    /*
     * Initialize single switch
     *
     * @param  {Element} obj                 - Radio controls. 
     * @return {Void}
     */

    var hideAllSingleSelItems = function hideAllSingleSelItems(obj) {
      obj.each(function (index) {
        var $sel = $(this),
            defaultValue = $('#' + $sel.attr('data-targetid')).val(),
            deffaultSwitchIndex = 0; //get default selected switch index

        $sel.find('> span').each(function (index) {
          if (defaultValue == $(this).data('value')) {
            deffaultSwitchIndex = index;
          }
        });

        if (form_js_typeof($sel.data('switchids')) != ( true ? "undefined" : undefined) && $sel.data('switchids') != '') {
          var _switchIDsArr = $sel.data('switchids').split(',');

          _switchIDsArr.forEach(function (element, index) {
            if (deffaultSwitchIndex != index) {
              $('#' + element).hide();
            } else {
              $('#' + element).show();
            }
          });
        }
      });
    };

    hideAllSingleSelItems($(singleSel));
    $(document).off('click.FORM_SINGLE_SEL').on('click.FORM_SINGLE_SEL', singleSelItem, function (e) {
      e.preventDefault();
      var $selector = $(this).parent(),
          $option = $(this),
          targetID = '#' + $selector.data("targetid"),
          switchID = '#' + $option.data("switchid"),
          curVal = $option.data('value'); //Radio Selector

      $selector.find('> span').removeClass('is-active').attr('aria-checked', false);
      $(targetID).val(curVal);
      $option.addClass('is-active').attr('aria-checked', true); //Switch some options

      if (form_js_typeof($option.data("switchid")) != ( true ? "undefined" : undefined)) {
        hideAllSingleSelItems($selector);
        $(switchID).show();
      } //Dynamic listening for the latest value


      $(targetID).focus().blur();
    });
    /* 
     ---------------------------
     Click Event of Normal Radio
     ---------------------------
     */

    var normalRadio = '.uix-controls__radio',
        normalRadioItem = normalRadio + ' > label';
    /*
     * Initialize single switch
     *
     * @param  {Element} obj                 - Radio controls. 
     * @return {Void}
     */

    var hideAllNormalRadioItems = function hideAllNormalRadioItems(obj) {
      obj.each(function (index) {
        var $sel = $(this),
            defaultValue = $('#' + $sel.attr("data-targetid")).val(),
            deffaultSwitchIndex = 0; //get default selected switch index

        $sel.find('> label').each(function (index) {
          if (defaultValue == $(this).data('value')) {
            deffaultSwitchIndex = index;
          }
        });

        if (form_js_typeof($sel.data('switchids')) != ( true ? "undefined" : undefined) && $sel.data('switchids') != '') {
          var _switchIDsArr = $sel.data('switchids').split(',');

          _switchIDsArr.forEach(function (element, index) {
            if (deffaultSwitchIndex != index) {
              $('#' + element).hide();
            } else {
              $('#' + element).show();
            }
          });
        }
      });
    };

    hideAllNormalRadioItems($(normalRadio));
    $(document).off('click.FORM_NORMAL_RADIO').on('click.FORM_NORMAL_RADIO', normalRadioItem, function (e) {
      e.preventDefault();
      var $selector = $(this).parent(),
          $option = $(this),
          targetID = '#' + $selector.data("targetid"),
          switchID = '#' + $option.data("switchid"),
          curVal = $option.data('value'); //Radio Selector

      $selector.find('> label').removeClass('is-active').find('[type="radio"]').prop('checked', false);
      $(targetID).val(curVal);
      $option.addClass('is-active').find('[type="radio"]').prop('checked', true); //Switch some options

      if (form_js_typeof($option.data("switchid")) != ( true ? "undefined" : undefined)) {
        hideAllNormalRadioItems($selector);
        $(switchID).show();
      } //Dynamic listening for the latest value


      $(targetID).focus().blur();
    });
    /* 
     ---------------------------
     Click Event of Checkbox and Toggle 
     ---------------------------
     */

    var checkboxSel = '.uix-controls__toggle [type="checkbox"], .uix-controls__checkbox [type="checkbox"]';
    $(document).on('change', checkboxSel, function (e) {
      //hide or display a associated div
      var $obj = $(this).closest('.uix-controls'),
          targetID = '#' + $obj.attr('data-targetid');

      if (this.checked) {
        $obj.addClass('is-active').attr('aria-checked', true);
        $(targetID).show();
      } else {
        $obj.removeClass('is-active').attr('aria-checked', false);
        $(targetID).hide();
      }
    });
  };

  module.components.documentReady.push(module.FORM.documentReady);
  return function FORM() {
    form_js_classCallCheck(this, FORM);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/gallery/scss/_style.scss
var gallery_scss_style = __webpack_require__(38);

// CONCATENATED MODULE: ./src/components/ES6/gallery/js/index.js
function gallery_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Gallery -->
 *************************************
 */

/**
 * module.GALLERY
 * 
 * @requires ./examples/assets/js/min/muuri.min.js
 */


var GALLERY = function (module, $, window, document) {
  if (window.GALLERY === null) return false;
  module.GALLERY = module.GALLERY || {};
  module.GALLERY.version = '0.0.5';

  module.GALLERY.documentReady = function ($) {
    $('.uix-gallery').each(function () {
      var galleryType = $(this).data('show-type');
      /* 
       ---------------------------
       Add a tagname to each list item
       ---------------------------
       */
      // Masonry

      if (galleryType.indexOf('masonry') >= 0) {
        $(this).addClass('masonry-container');
        $(this).find('.uix-gallery__item').addClass('masonry-item');
      } // Filterable


      if (galleryType.indexOf('filter') >= 0) {
        $(this).addClass('filter-container');
        $(this).find('.uix-gallery__item').addClass('filter-item');
      }

      if (galleryType.indexOf('filter') >= 0 || galleryType.indexOf('masonry') >= 0) {
        var filterCat = $(this).data('filter-id'),
            $grid = $(this).find('.uix-gallery__tiles'),
            $allItems = $(this).find('.uix-gallery__item'),
            $filterOptions = $(filterCat);
        var MuuriGrid = new Muuri($grid.get(0), {
          items: $grid.get(0).querySelectorAll('.uix-gallery__item'),
          // Default show animation
          showDuration: 300,
          showEasing: 'ease',
          // Default hide animation
          hideDuration: 300,
          hideEasing: 'ease',
          // Item's visible/hidden state styles
          visibleStyles: {
            opacity: '1',
            transform: 'scale(1)'
          },
          hiddenStyles: {
            opacity: '0',
            transform: 'scale(0.5)'
          },
          // Layout
          layout: {
            fillGaps: false,
            horizontal: false,
            alignRight: false,
            alignBottom: false,
            rounding: true
          },
          layoutOnResize: 100,
          layoutOnInit: true,
          layoutDuration: 300,
          layoutEasing: 'ease',
          //// Drag & Drop
          dragEnabled: false
        }); // When all items have loaded refresh their
        // dimensions and layout the grid.

        $grid.waitForImages().done(function () {
          MuuriGrid.refreshItems().layout(); // For a little finishing touch, let's fade in
          // the images after all them have loaded and
          // they are corrertly positioned.

          $('body').addClass('images-loaded');
        });
        /* 
         ---------------------------
         Function of Filterable and Masonry
         ---------------------------
         */

        if (galleryType.indexOf('filter') >= 0) {
          $filterOptions.find('li > a').off('click').on('click', function () {
            var $this = $(this);
            var activeClass = 'current-cat',
                isActive = $this.parent().hasClass(activeClass),
                group = isActive ? 'all' : $this.data('group'); // Hide current label, show current label in title

            if (!isActive) {
              $filterOptions.find('.' + activeClass).removeClass(activeClass);
            }

            $this.parent().toggleClass(activeClass); // Filter elements

            var filterFieldValue = group;
            MuuriGrid.filter(function (item) {
              var element = item.getElement(),
                  curCats = element.getAttribute('data-groups').toString().replace(/^\,|\,$/g, '').replace(/^\[|\]$/g, '') + ',all',
                  isFilterMatch = !filterFieldValue ? true : (curCats || '').indexOf(filterFieldValue) > -1;
              return isFilterMatch;
            });
            return false;
          });
        } else {
          //remove filter button of all
          $filterOptions.find('[data-group="all"]').parent('li').remove();
        }
      }
    });
  };

  module.components.documentReady.push(module.GALLERY.documentReady);
  return function GALLERY() {
    gallery_js_classCallCheck(this, GALLERY);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/hover-delay-interaction/js/index.js
function hover_delay_interaction_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Hover Delay Interaction -->
 *************************************
 */

var HOVER_DELAY_INTERACTION = function (module, $, window, document) {
  if (window.HOVER_DELAY_INTERACTION === null) return false;
  module.HOVER_DELAY_INTERACTION = module.HOVER_DELAY_INTERACTION || {};
  module.HOVER_DELAY_INTERACTION.version = '0.0.1';

  module.HOVER_DELAY_INTERACTION.documentReady = function ($) {
    var delayTime = 250;
    $('.uix-hover-delay-el').on('mouseover', function () {
      var $this = $(this);

      if ($this.prop('hoverTimeout')) {
        $this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
      }

      $this.prop('hoverIntent', setTimeout(function () {
        $this.find('> div').html('Okay!');
      }, delayTime));
    }).on('mouseleave', function () {
      var $this = $(this);

      if ($this.prop('hoverIntent')) {
        $this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
      }

      $this.prop('hoverTimeout', setTimeout(function () {
        $this.find('> div').html('Touch Me');
      }, delayTime));
    });
  };

  module.components.documentReady.push(module.HOVER_DELAY_INTERACTION.documentReady);
  return function HOVER_DELAY_INTERACTION() {
    hover_delay_interaction_js_classCallCheck(this, HOVER_DELAY_INTERACTION);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/image-shapes/scss/_style.scss
var image_shapes_scss_style = __webpack_require__(39);

// CONCATENATED MODULE: ./src/components/ES6/image-shapes/js/index.js
function image_shapes_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Image Shapes -->
 *************************************
 */


var IMAGE_SHAPES = function (module, $, window, document) {
  if (window.IMAGE_SHAPES === null) return false;
  module.IMAGE_SHAPES = module.IMAGE_SHAPES || {};
  module.IMAGE_SHAPES.version = '0.0.1';

  module.IMAGE_SHAPES.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //  Initialize

    shapesInit(windowWidth);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth; // Do stuff here

        shapesInit(windowWidth);
      }
    });
    /*
     * Initialize Shapes
     *
     * @param  {Number} w         - Returns width of browser viewport
     * @param  {Number} h         - Returns height of browser viewport
     * @return {Void}
     */

    function shapesInit(w) {
      $('.uix-shape-img').each(function () {
        var $this = $(this);
        var ranID = 'uix-shape-img-' + UixGUID.create(),
            svgPath = $this.data('path'),
            svgW = parseFloat($this.data('svg-const-width')),
            svgH = parseFloat($this.data('svg-const-height')),
            svgRatio = svgW / svgH,
            curImgURL = $this.find('img').attr('src');
        var imgW = parseFloat($this.data('img-width'));
        var imgRatio = null,
            bothWidthRatio = null,
            newSvgHeight = null,
            newImgHeight = null,
            svgOut = '',
            curImgW = imgW,
            curImgH = null;

        if (imgW > w) {
          imgW = w;
        } //Check if the picture is loaded on the page


        var img = new Image();

        img.onload = function () {
          curImgH = $this.find('img').height();
          curImgW = $this.find('img').width();
          imgRatio = curImgW / curImgH; //Add a custom shape SVG to the page

          bothWidthRatio = imgW / svgW;
          newSvgHeight = imgW / svgRatio;
          newImgHeight = svgW / imgRatio;
          svgOut += '<svg fill-rule="evenodd" clip-rule="evenodd" width="' + imgW + 'px" height="' + newSvgHeight + 'px" viewBox="0 0 ' + imgW + ' ' + newSvgHeight + '" >';
          svgOut += '	<pattern id="' + ranID + '" patternUnits="userSpaceOnUse" width="' + svgW + '" height="' + svgH + '">';
          svgOut += '		  <image xlink:href="' + curImgURL + '" width="' + svgW + 'px" height="' + newImgHeight + 'px" x="0" y="0" />';
          svgOut += '	</pattern> ';
          svgOut += '	<path fill="url(#' + ranID + ')" transform="scale(' + bothWidthRatio + ')" d="' + svgPath + '"/>';
          svgOut += '</svg>';
          $this.addClass('is-active').html(svgOut);
        };

        img.src = curImgURL;
      });
    }
  };

  module.components.documentReady.push(module.IMAGE_SHAPES.documentReady);
  return function IMAGE_SHAPES() {
    image_shapes_js_classCallCheck(this, IMAGE_SHAPES);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/lava-lamp-style-menu/scss/_style.scss
var lava_lamp_style_menu_scss_style = __webpack_require__(40);

// CONCATENATED MODULE: ./src/components/ES6/lava-lamp-style-menu/js/index.js
function lava_lamp_style_menu_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Lava-Lamp Style Menu -->
 *************************************
 */


var LAVA_LAMP_STYLE_MENU = function (module, $, window, document) {
  if (window.LAVA_LAMP_STYLE_MENU === null) return false;
  module.LAVA_LAMP_STYLE_MENU = module.LAVA_LAMP_STYLE_MENU || {};
  module.LAVA_LAMP_STYLE_MENU.version = '0.0.1';

  module.LAVA_LAMP_STYLE_MENU.documentReady = function ($) {
    var $menuContainer = $('.uix-lavalamp-menu__container'),
        menu = 'ul.uix-lavalamp-menu',
        line = menu + ' .uix-lavalamp-menu__slide-line'; //Prevent this module from loading in other pages

    if ($menuContainer.length == 0) return false; // adds sliding underline HTML

    $(menu).append('<span class="uix-lavalamp-menu__slide-line"></span>'); // set initial position of slide line

    TweenMax.set(line, {
      css: {
        width: 0,
        x: 0,
        y: 0
      }
    });

    function nemuLineGo(index) {
      var $this = $(menu + ' > li').eq(index).find('a'),
          offset = $this.offset(),
          offsetBody = $('.uix-lavalamp-menu__container').offset(); //find the offset of the wrapping div  
      //Activate navigation style

      $(menu + ' > li').removeClass('is-active');
      $this.parent().addClass('is-active'); // GSAP animate to clicked menu item

      TweenMax.to(line, 1, {
        css: {
          width: parseFloat($this.outerWidth() + 0) + 'px',
          x: offset.left - offsetBody.left + 'px'
        },
        ease: Elastic.easeOut.config(1, 0.5)
      });
    } // animate slide-line on click


    $(document).on('mouseover', menu + ' > li a', function () {
      nemuLineGo($(this).parent().index());
    });
    nemuLineGo(0);
  };

  module.components.documentReady.push(module.LAVA_LAMP_STYLE_MENU.documentReady);
  return function LAVA_LAMP_STYLE_MENU() {
    lava_lamp_style_menu_js_classCallCheck(this, LAVA_LAMP_STYLE_MENU);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/lightbox/scss/_style.scss
var lightbox_scss_style = __webpack_require__(41);

// CONCATENATED MODULE: ./src/components/ES6/lightbox/js/index.js
function lightbox_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lightbox_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { lightbox_js_typeof = function _typeof(obj) { return typeof obj; }; } else { lightbox_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return lightbox_js_typeof(obj); }

/* 
 *************************************
 * <!-- Custom Lightbox -->
 *************************************
 */

/**
 * module.LIGHTBOX
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */



var LIGHTBOX = function (module, $, window, document) {
  if (window.LIGHTBOX === null) return false;
  module.LIGHTBOX = module.LIGHTBOX || {};
  module.LIGHTBOX.version = '0.2.0';

  module.LIGHTBOX.pageLoaded = function () {
    if ($('.uix-lightbox__container').length == 0) {
      $('body').prepend('<div class="uix-lightbox__loading is-loaded uix-t-c"><i class="fa fa-spinner fa-spin"></i> Loading...</div><a class="uix-lightbox__original__close" href="javascript:void(0);"></a><div class="uix-lightbox__container"><div class="uix-lightbox__inner"><div class="uix-lightbox__html"></div><p class="title"></p></div></div><div class="uix-lightbox__container-mask"></div><div class="uix-lightbox__close"><button type="button"></button></div>');
    } // To display the template tag content.


    $('template').each(function () {
      var _content = $(this).html(function (index, html) {
        return html.replace(/[\r\n]/g, '');
      }).context.innerHTML,
          _id = $(this).attr('id'); //If it is dialog, clone the contents of the <template> into the body


      if (lightbox_js_typeof(_id) !== ( true ? "undefined" : undefined) && !$('body').hasClass(_id) && $('<div>' + _content + '</div>').find('[role="dialog"]').length > 0) {
        //reset id
        $(this).removeAttr('id');
        $('body').addClass(_id); //append content to body

        $(_content.replace(/role=[\'\"]dialog[\'\"]/, 'role="dialog" id="' + _id + '"')).appendTo('body');
      }
    });
    var innerEl = '.uix-lightbox__inner',
        wrapperEl = '.uix-lightbox__container',
        loaderEl = '.uix-lightbox__loading',
        maskEl = '.uix-lightbox__container-mask',
        closeEl = '.uix-lightbox__close',
        largeImgCloseEl = '.uix-lightbox__original__close',
        triggerEl = '.uix-lightbox__trigger',
        docURL = window.location.href,
        $content = $(innerEl).find('.uix-lightbox__html'),
        customWidth = 1000; //Match the width in the css file;
    //Detect URL change & Fire click event

    window.addEventListener('popstate', function (e) {
      var eleTarget = null;
      $('[data-lb-ajax]').each(function () {
        var prevURL = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent('uix-lightbox-ajaxURL').replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

        if ($(this).attr('href') === prevURL) {
          eleTarget = this;
        }
      });
      var backURL = $(eleTarget).data('lb-ajax-doc-url');

      if (lightbox_js_typeof(backURL) != ( true ? "undefined" : undefined)) {
        lightboxClose(backURL);
      }
    });
    $(document).off('click.LIGHTBOX_TRIGGER').on('click.LIGHTBOX_TRIGGER', triggerEl, function () {
      var $this = $(this);
      var dataPhoto = $this.data('lb-src'),
          dataHtmlID = $this.data('lb-html'),
          dataFixed = $this.data('lb-fixed'),
          dataMaskClose = $this.data('lb-mask-close'),
          dataAjax = $this.data('lb-ajax'),
          htmlContent = '',
          imgSrcStr = '',
          imgSrcStrToW = '';

      if (lightbox_js_typeof(dataFixed) === ( true ? "undefined" : undefined)) {
        dataFixed = true;
      }

      if (lightbox_js_typeof(dataMaskClose) === ( true ? "undefined" : undefined)) {
        dataMaskClose = false;
      }

      if (lightbox_js_typeof(dataAjax) === ( true ? "undefined" : undefined)) {
        dataAjax = false;
      }

      if (dataAjax) {
        $(wrapperEl).addClass('js-uix-ajax'); //Record current page URL for history

        if (lightbox_js_typeof($this.data('lb-ajax-doc-url')) === ( true ? "undefined" : undefined)) $this.data('lb-ajax-doc-url', docURL);
      } //Display loading


      $(loaderEl).removeClass('is-loaded'); //Reset the wrapper position

      $(wrapperEl).css('margin-top', 0);

      if (!dataFixed) {
        $(wrapperEl).addClass('js-uix-no-fixed');
        $(closeEl).addClass('is-active'); //Initialize the wrapper position

        $(wrapperEl).css('margin-top', $(window).scrollTop() + 'px');
      } //Reset current container type


      $(innerEl).removeClass('js-uix-custom js-uix-pure-image'); // Locks the page

      if (!$(wrapperEl).hasClass('js-uix-no-fixed')) {
        $.scrollLock(true);
      } // Show the lightbox


      var showLightbox = function showLightbox() {
        $(closeEl).addClass('is-active');
        $(wrapperEl).show();
        $(maskEl).show();
        $(innerEl).show();
      }; // hide the content container


      var hideLightboxContent = function hideLightboxContent() {
        TweenMax.set($content, {
          css: {
            'display': 'none'
          }
        });
      }; // show the content container


      var showLightboxContent = function showLightboxContent() {
        TweenMax.set($content, {
          css: {
            'display': 'block'
          },
          onComplete: function onComplete() {
            TweenMax.to(this.target, 0.5, {
              alpha: 1
            });
          }
        });
      };

      hideLightboxContent(); ////////////////////////
      //////// PHOTOS ///////
      ////////////////////////  

      if (lightbox_js_typeof(dataPhoto) != ( true ? "undefined" : undefined) && dataPhoto != '') {
        //show the lightbox
        showLightbox();

        if (dataPhoto.indexOf('[') >= 0 && dataPhoto.indexOf(']') >= 0) {
          imgSrcStr = JSON.parse(dataPhoto.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g, '"'));
        } else {
          imgSrcStr = dataPhoto;
        } //Judging whether multiple image sets


        if (Object.prototype.toString.call(imgSrcStr) == '[object Array]') {
          var largePhotos = '',
              thumbs = '';
          imgSrcStrToW = imgSrcStr[0].large; //push the large photos

          largePhotos += '<div class="uix-lightbox__photo-container uix-lightbox__photo-sets-container"><a href="javascript:" class="uix-lightbox__photo-sets__prev"></a><a href="javascript:" class="uix-lightbox__photo-sets__next"></a><ul>';

          for (var i = 0; i < imgSrcStr.length; i++) {
            var tempID = 'lightbox-' + UixGUID.create();
            largePhotos += '<li>';
            largePhotos += '	<a class="uix-lightbox__original__link" data-target-id="' + tempID + '-sets-' + i + '" href="javascript:void(0);">';
            largePhotos += '	   <img src="' + imgSrcStr[i].large + '" alt="">';
            largePhotos += '	</a>';
            largePhotos += '	<div class="uix-lightbox__original__target" id="' + tempID + '-sets-' + i + '">';
            largePhotos += '	   <img src="' + imgSrcStr[i].large + '" alt="">';
            largePhotos += '	</div>';
            largePhotos += '</li>';
          }

          largePhotos += '</ul></div>'; //push the thumbs

          thumbs += '<div class="uix-lightbox__thumb-container"><ul>';

          for (var k = 0; k < imgSrcStr.length; k++) {
            var active = k == 0 ? 'class="is-active"' : '';
            thumbs += '<li ' + active + '><img src="' + imgSrcStr[k].thumb + '" alt=""></li>';
          }

          thumbs += '</ul></div>';
          htmlContent = largePhotos + thumbs;
        } else {
          var _tempID = 'lightbox-' + UixGUID.create(); //Only one image


          imgSrcStrToW = imgSrcStr;
          htmlContent += '<div class="uix-lightbox__photo-container">';
          htmlContent += '	<a class="uix-lightbox__original__link" data-target-id="' + _tempID + '" href="javascript:void(0);">';
          htmlContent += '	   <img src="' + imgSrcStr + '" alt="">';
          htmlContent += '	</a>';
          htmlContent += '	<div class="uix-lightbox__original__target" id="' + _tempID + '">';
          htmlContent += '	   <img src="' + imgSrcStr + '" alt="">';
          htmlContent += '	</div>';
          htmlContent += '</div>';
        }

        $content.html(htmlContent).promise().done(function () {
          //Set current container type
          $(innerEl).addClass('js-uix-pure-image'); //Set container width

          var img = new Image();
          img.src = imgSrcStrToW;

          img.onload = function () {
            //remove loading
            $(loaderEl).addClass('is-loaded'); // show the content container

            showLightboxContent();
            var sw = window.innerWidth - 30,
                ow = this.width,
                oh = this.height,
                ratioH = oh / ow,
                ratioW = ow / oh,
                w = ow > customWidth ? customWidth : ow,
                h;
            if (w > sw) w = sw;
            h = w * ratioH; //Prevent height overflow

            if (h > window.innerHeight) h = window.innerHeight * 0.95;
            $(innerEl).css({
              'width': w + 'px'
            }); //Don't write variables outside

            var $lbSetsContainer = $('.uix-lightbox__photo-container.uix-lightbox__photo-sets-container');
            $lbSetsContainer.css({
              'height': h + 'px'
            }); //Set a new height & width of inside images

            $content.find('.uix-lightbox__photo-sets-container ul > li img').css({
              'height': h + 'px'
            });

            if (!$('body').hasClass('rtl')) {
              $content.find('.uix-lightbox__photo-sets-container').css({
                'width': 'calc(' + h * ratioW + 'px + 6rem)',
                'margin-left': '-3rem'
              });
            } else {
              $content.find('.uix-lightbox__photo-sets-container').css({
                'width': 'calc(' + h * ratioW + 'px + 6rem)',
                'margin-right': '-3rem'
              });
            } //If the image is larger than the current window, it will display at the top.
            //Don't write variables outside


            var $lbTarImg = $('.uix-lightbox__photo-container > .uix-lightbox__original__target');

            if (oh > window.innerHeight) {
              $lbTarImg.addClass('uix-lightbox__original__target--imgfull');
            } else {
              $lbTarImg.removeClass('uix-lightbox__original__target--imgfull');
            }
          };

          $(innerEl).find('> .uix-lightbox__html').removeClass('js-uix-no-img');
        });
      } ////////////////////////
      //////// HTML /////////
      ////////////////////////  


      if (lightbox_js_typeof(dataHtmlID) != ( true ? "undefined" : undefined) && dataHtmlID != '') {
        dataHtmlID = dataHtmlID.replace('#', '');
        var $htmlAjaxContainer = $('#' + dataHtmlID).find('.uix-lightbox__content > div'); //show the lightbox

        showLightbox(); // Content pushing completed

        var htmlContentLoaded = function htmlContentLoaded() {
          //remove loading
          $(loaderEl).addClass('is-loaded'); //Set current container type

          $(innerEl).addClass('js-uix-custom'); //Set container width

          if ($(innerEl).find('> .uix-lightbox__html .uix-lightbox__content').length > 0) {
            if (window.innerWidth <= 768) {
              $(innerEl).css('width', window.innerWidth - 10 + 'px');
            } else {
              $(innerEl).css('width', $(innerEl).find('> .uix-lightbox__html .uix-lightbox__content').width() + 'px');
            }

            $(innerEl).find('> .uix-lightbox__html').addClass('js-uix-no-img');
          }
        };

        if ($(wrapperEl).hasClass('js-uix-ajax')) {
          //Add content to the dynamic AJAX container
          var ajaxURL = $this.attr('href'),
              ajaxConfig = dataAjax; // Modify the URL without reloading the page

          if (history.pushState) {
            history.pushState(null, null, ajaxURL);
          } else {
            location.hash = ajaxURL;
          }

          document.cookie = 'uix-lightbox-ajaxURL=' + ajaxURL; // Add a request or response interceptor

          var axiosInterceptor = axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            //
            return config;
          }, function (error) {
            return Promise.reject(error);
          }); // To send data in the application/x-www-form-urlencoded format instead

          var formData = new FormData();
          var defaultPostData = {
            action: 'load_singlepages_ajax_content'
          };

          for (var _k in defaultPostData) {
            formData.append(_k, defaultPostData[_k]);
          } // Create a request event


          axios({
            timeout: 15000,
            method: ajaxConfig.method,
            url: ajaxURL,
            data: formData,
            responseType: 'text'
          }).then(function (response) {
            var htmlCode = response.data;
            $htmlAjaxContainer.html($(htmlCode).find(dataAjax.target).html()).promise().done(function () {
              $content.html($('#' + dataHtmlID).html()).promise().done(function () {
                // Apply some asynchronism scripts
                $(document).UixApplyAsyncScripts({
                  lightBox: false,
                  ajaxPostList: false
                }); // show the content container

                showLightboxContent(); // Content pushing completed

                htmlContentLoaded();
              });
            });
          })["catch"](function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              var status = error.response.status;
              console.log(status);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request); //

              window.location.href = ajaxURL;
            } else {
              // If there was a problem, we need to
              // dispatch the error condition
              console.log(error.message);
            }
          }); // Remove an interceptor later

          axios.interceptors.request.eject(axiosInterceptor);
        } else {
          // show the content container
          showLightboxContent();
          $content.html($('#' + dataHtmlID).html()).promise().done(function () {
            // Content pushing completed
            htmlContentLoaded();
          });
        } //endif $( wrapperEl ).hasClass( 'js-uix-ajax' )

      }

      return false;
    });
    /* end click event for triggerEl */
    ////////////////////////
    // Close the lightbox //
    ////////////////////////   	

    $(document).off('click.LIGHTBOX_CLOSE').on('click.LIGHTBOX_CLOSE', closeEl + ',' + maskEl, function () {
      lightboxClose(docURL);
    });
    $(document).off('click.LIGHTBOX_THUMB').on('click.LIGHTBOX_THUMB', '.uix-lightbox__thumb-container li', function () {
      lightboxThumbSwitch($(this).index(), $(this));
    });
    $(document).off('click.LIGHTBOX_PHOTO_SETS').on('click.LIGHTBOX_PHOTO_SETS', '.uix-lightbox__photo-sets-container > a', function () {
      var $largePhoto = $(this).closest('.uix-lightbox__html').find('.uix-lightbox__photo-container.uix-lightbox__photo-sets-container'),
          $thumb = $(this).closest('.uix-lightbox__html').find('.uix-lightbox__thumb-container li'),
          total = $thumb.length,
          curIndex = $thumb.filter('.is-active').index();
      var prevIndex = curIndex - 1,
          nextIndex = curIndex + 1;
      if (prevIndex < 0) prevIndex = total - 1;
      if (nextIndex > total - 1) nextIndex = 0;

      if ($(this).hasClass('uix-lightbox__photo-sets__prev')) {
        lightboxThumbSwitch(prevIndex, $thumb.eq(prevIndex));
      }

      if ($(this).hasClass('uix-lightbox__photo-sets__next')) {
        lightboxThumbSwitch(nextIndex, $thumb.eq(nextIndex));
      }
    }); ////////////////////////////////
    // Close/Open enlarge image //
    ///////////////////////////////	

    if (window.innerWidth > 768) {
      $(document).off('click.LIGHTBOX_ORGINAL_LINK').on('click.LIGHTBOX_ORGINAL_LINK', '.uix-lightbox__original__link', function (e) {
        $('.uix-lightbox__original__target#' + $(this).data('target-id')).addClass('is-active');

        if ($(this).closest('.uix-lightbox__container.js-uix-no-fixed').length > 0) {
          $('.uix-lightbox__container.js-uix-no-fixed, .uix-lightbox__original__target--imgfull').addClass('no-fixed-imgEnlarged');
        } //---


        $('html').css('overflow-y', 'hidden');
        $(largeImgCloseEl).addClass('is-active');
      });
      $(document).off('click.LIGHTBOX_LARGE_IMG_CLOSE').on('click.LIGHTBOX_LARGE_IMG_CLOSE', largeImgCloseEl, function (e) {
        $('.uix-lightbox__original__target').removeClass('is-active');
        $('.uix-lightbox__container.js-uix-no-fixed, .uix-lightbox__original__target--imgfull').removeClass('no-fixed-imgEnlarged'); //---

        $(this).removeClass('is-active');
        $('html').css('overflow-y', 'auto');
      });
    }
    /*
     * Click thumbnail to show large photo
     *
     * @param  {Number} index           - The target index of large photo.
     * @param  {Element} obj             - Target large image <li>.
     * @return {Void}
     */


    function lightboxThumbSwitch(index, obj) {
      var $largePhoto = obj.closest('.uix-lightbox__html').find('.uix-lightbox__photo-container.uix-lightbox__photo-sets-container'),
          $thumb = obj.closest('.uix-lightbox__html').find('.uix-lightbox__thumb-container li'); // show the content container

      var showLightboxContent = function showLightboxContent() {
        TweenMax.set(obj.closest('.uix-lightbox__html'), {
          css: {
            'display': 'block'
          },
          onComplete: function onComplete() {
            TweenMax.to(this.target, 0.5, {
              alpha: 1
            });
          }
        });
      };

      $thumb.removeClass('is-active');
      obj.addClass('is-active'); //all items

      TweenMax.set($largePhoto.find('li'), {
        css: {
          'display': 'none',
          'opacity': 0
        },
        onComplete: function onComplete() {
          $(this.target).removeClass('is-active');
        }
      }); //current item

      TweenMax.set($largePhoto.find('li').eq(index), {
        css: {
          'display': 'block',
          'opacity': 0
        },
        onComplete: function onComplete() {
          var _cur = this.target;
          $(_cur).addClass('is-active'); //
          //Reset the container height

          var imgClick = new Image();
          imgClick.src = $largePhoto.find('li').eq(index).find('img').attr('src');

          imgClick.onload = function () {
            //remove loading
            $(loaderEl).addClass('is-loaded'); // show the content container

            showLightboxContent();
            var sw = window.innerWidth - 30,
                ow = this.width,
                oh = this.height,
                ratioH = oh / ow,
                w = ow > customWidth ? customWidth : ow,
                h;
            if (w > sw) w = sw;
            h = w * ratioH; //Prevent height overflow

            if (h > window.innerHeight) h = window.innerHeight * 0.95;
            $largePhoto.css({
              'height': h + 'px'
            }).find('img').css({
              'height': h + 'px'
            }); //If the image is larger than the current window, it will display at the top.
            //Don't write variables outside

            var $lbTarImg = $largePhoto.find('li').eq(index).find('.uix-lightbox__original__target');

            if (oh > window.innerHeight) {
              $lbTarImg.addClass('uix-lightbox__original__target--imgfull');
            } else {
              $lbTarImg.removeClass('uix-lightbox__original__target--imgfull');
            }

            TweenMax.to(_cur, 0.5, {
              alpha: 1
            });
          }; //imgClick.onload       

        }
      });
    }
    /*
     * Close the lightbox
     *
     * @param  {String} url             - The current page URL for history.
     * @return {Void}
     */


    function lightboxClose(url) {
      //Detect URL change when AJAX calls are done
      if ($(wrapperEl).hasClass('js-uix-ajax')) {
        history.pushState(null, null, url);
      } //Remove all dynamic classes


      $(wrapperEl).removeClass('js-uix-no-fixed js-uix-ajax');
      $(closeEl).removeClass('is-active'); //Add a scroll bar.

      $('html').css('overflow-y', 'auto'); //Reset current container type

      $(innerEl).removeClass('js-uix-custom js-uix-pure-image'); //close windows

      $(wrapperEl).hide();
      $(maskEl).hide(); // Unlocks the page

      $.scrollLock(false);
    }
  };

  module.components.pageLoaded.push(module.LIGHTBOX.pageLoaded);
  return function LIGHTBOX() {
    lightbox_js_classCallCheck(this, LIGHTBOX);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/list-bulleted/scss/_style.scss
var list_bulleted_scss_style = __webpack_require__(42);

// CONCATENATED MODULE: ./src/components/ES6/list-bulleted/js/index.js
function list_bulleted_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Bulleted List -->
 *************************************
 */


var BULLETED_LIST = function (module, $, window, document) {
  if (window.BULLETED_LIST === null) return false;
  module.BULLETED_LIST = module.BULLETED_LIST || {};
  module.BULLETED_LIST.version = '0.0.1';

  module.BULLETED_LIST.documentReady = function ($) {
    // Icon bulleted lists
    $('[data-list-bullet]').each(function () {
      var bullet = $(this).attr('data-list-bullet');
      $(this).find('li').prepend('<i class="' + bullet + '" aria-hidden="true"></i>');
    });
  };

  module.components.documentReady.push(module.BULLETED_LIST.documentReady);
  return function BULLETED_LIST() {
    list_bulleted_js_classCallCheck(this, BULLETED_LIST);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/list-posts/scss/_basic.scss
var list_posts_scss_basic = __webpack_require__(43);

// EXTERNAL MODULE: ./src/components/ES6/list-posts/scss/_split.scss
var _split = __webpack_require__(44);

// CONCATENATED MODULE: ./src/components/ES6/list-posts/js/index.js
function list_posts_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function list_posts_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { list_posts_js_typeof = function _typeof(obj) { return typeof obj; }; } else { list_posts_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return list_posts_js_typeof(obj); }

/* 
 *************************************
 * <!-- Posts List With Ajax -->
 *************************************
 */

/**
 * module.POST_LIST_AJAX 
 * 
 * @requires ./examples/assets/js/min/template7.min.js
 * @requires ./examples/assets/js/min/muuri.min.js
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */




var POST_LIST_AJAX = function (module, $, window, document) {
  if (window.POST_LIST_AJAX === null) return false;
  module.POST_LIST_AJAX = module.POST_LIST_AJAX || {};
  module.POST_LIST_AJAX.version = '0.1.6';

  module.POST_LIST_AJAX.documentReady = function ($) {
    $(window).off('scroll.POST_LIST_AJAX touchmove.POST_LIST_AJAX');
    $('[data-ajax-list-json]').each(function () {
      var $this = $(this);
      var wrapperID = 'refresh-all-waypoint-' + UixGUID.create();
      var curPage = $this.data('ajax-list-page-now'),
          perShow = $this.data('ajax-list-page-per'),
          totalPage = $this.data('ajax-list-page-total'),
          method = $this.data('ajax-list-method'),
          trigger = $this.data('ajax-list-trigger'),
          infinitescroll = $this.data('ajax-list-infinitescroll'),
          jsonFile = $this.data('ajax-list-json'),
          render = $this.data('ajax-list-render'),
          template7ID = $this.data('ajax-list-temp-id'),
          pushContainer = $this.data('ajax-list-push-container-class'),
          triggerActive = $this.data('ajax-list-trigger-active-class'),
          pageParmStr = $this.data('ajax-list-page-parm-str'),
          noneInfo = $this.data('ajax-list-none-info');
      $this.attr('id', wrapperID);

      if (list_posts_js_typeof(pageParmStr) === ( true ? "undefined" : undefined)) {
        pageParmStr = {
          'totalPage': 'total',
          'currentPage': 'page',
          'displayPerPage': 'per'
        };
      }

      if (list_posts_js_typeof(curPage) === ( true ? "undefined" : undefined)) {
        curPage = 1;
      }

      if (list_posts_js_typeof(perShow) === ( true ? "undefined" : undefined)) {
        perShow = 8;
      }

      if (list_posts_js_typeof(totalPage) === ( true ? "undefined" : undefined)) {
        totalPage = 3;
      }

      if (list_posts_js_typeof(totalPage) != ( true ? "undefined" : undefined) && totalPage == '-1') {
        totalPage = 9999;
      }

      if (list_posts_js_typeof(trigger) === ( true ? "undefined" : undefined)) {
        trigger = '.uix-load-more';
      }

      if (list_posts_js_typeof(infinitescroll) === ( true ? "undefined" : undefined)) {
        infinitescroll = false;
      }

      if (list_posts_js_typeof(render) === ( true ? "undefined" : undefined)) {
        render = 'before';
      }

      if (list_posts_js_typeof(jsonFile) === ( true ? "undefined" : undefined)) {
        jsonFile = '';
      }

      if (list_posts_js_typeof(template7ID) === ( true ? "undefined" : undefined)) {
        template7ID = '';
      }

      if (list_posts_js_typeof(triggerActive) === ( true ? "undefined" : undefined)) {
        triggerActive = 'wait';
      }

      if (list_posts_js_typeof(method) === ( true ? "undefined" : undefined)) {
        method = 'POST';
      }

      if (list_posts_js_typeof(noneInfo) === ( true ? "undefined" : undefined)) {
        noneInfo = '{"none":"","error":""}';
      }

      triggerActive = triggerActive.replace('.', '');

      if (list_posts_js_typeof(pushContainer) === ( true ? "undefined" : undefined)) {
        pushContainer = '.uix-ajax-items__container';

        if ($this.find(pushContainer).length == 0) {
          $('#' + template7ID).after('<div class="uix-ajax-items__container"></div>');
        }
      } //Get all attributes of an element and push the new attributes like "data-*"


      var curAttrs = $this.attr(),
          defaultPostData = '',
          customPostData = '';
      $.each(curAttrs, function (i, val) {
        if (i.indexOf('data-ajax-list-field-') >= 0) {
          customPostData += '"' + i.replace('data-ajax-list-field-', '') + '": ' + '"' + val + '", ';
        }
      });
      customPostData = customPostData.replace(/,\s*$/, ''); //Parse the JSON data

      if (jsonFile != '' && template7ID != '') {
        //Default output of the first page
        if (curPage == 2) {
          //Perform dynamic loading
          if (customPostData != '') {
            defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": 1, ' + customPostData + ' }');
          } else {
            defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": 1 }');
          }

          ajaxLoadInit($this, defaultPostData, $(trigger), curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, render, noneInfo);
        }

        if (infinitescroll) {
          /* 
           ---------------------------
           Infinite scroll
           ---------------------------
           */
          var $button = $(trigger),
              btnTop = $button.offset().top; //Add default page number to the button

          $button.attr('data-cur-page', 1); //Hide the next button 

          if (totalPage == 1) {
            $button.addClass('is-hide');
          } // Please do not use scroll's off method in each


          $(window).on('scroll.POST_LIST_AJAX touchmove.POST_LIST_AJAX', function () {
            var spyTop = parseFloat($button[0].getBoundingClientRect().top + $button.outerHeight(true));

            if (spyTop < window.innerHeight && !$button.hasClass(triggerActive)) {
              // Active this button
              $button.addClass(triggerActive);

              var _curPage = $button.attr('data-cur-page'); //Add next page number to the button


              _curPage = parseFloat(_curPage) + 1;
              $button.attr('data-cur-page', _curPage); //Avoid touching the same button multiple times

              if (_curPage == totalPage + 1) return false; //Perform dynamic loading

              if (customPostData != '') {
                defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": ' + _curPage + ', ' + customPostData + ' }');
              } else {
                defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": ' + _curPage + ' }');
              }

              ajaxLoadInit($this, defaultPostData, $button, _curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, render, noneInfo);
            }
          });
        } else {
          /* 
           ---------------------------
           Ajax with JSON data
           ---------------------------
           */
          var triggerStr = '';

          if (trigger.indexOf('[') >= 0 && trigger.indexOf(']') >= 0) {
            triggerStr = JSON.parse(trigger.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g, '"'));
          } else {
            triggerStr = trigger;
          } //Whether there are two flip buttons "Previous" and "Next"


          if (Object.prototype.toString.call(triggerStr) == '[object Array]') {
            var prevTrigger = triggerStr[0].prev,
                nextTrigger = triggerStr[1].next; //Add default page number to the button

            $(nextTrigger).parent().attr('data-cur-page', 1); //--------------- Next Button ------------------
            //Hide the next button 

            if (totalPage == 1) {
              $(nextTrigger).addClass('is-hide');
            } //Avoid using $( document ) to cause an asynchronous load without counting from 1


            $(nextTrigger).off('click').on('click', function (e) {
              e.preventDefault();
              var $button = $(this);
              var curPage = $button.parent().attr('data-cur-page'); //Add next page number to the button

              curPage = parseFloat(curPage) + 1;
              $button.parent().attr('data-cur-page', curPage); //Init button status

              $(prevTrigger).removeClass(triggerActive);
              $(nextTrigger).removeClass(triggerActive);
              $(prevTrigger).removeClass('is-hide'); // Active this button

              $button.addClass(triggerActive); //Perform dynamic loading

              if (customPostData != '') {
                defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": ' + curPage + ', ' + customPostData + ' }');
              } else {
                defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": ' + curPage + ' }');
              }

              ajaxLoadInit($this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, render, noneInfo);
              return false;
            }); //----------------- Previous Button ----------------
            //Hide the prev button 

            $(prevTrigger).addClass('is-hide'); //Avoid using $( document ) to cause an asynchronous load without counting from 1

            $(prevTrigger).off('click').on('click', function (e) {
              e.preventDefault();
              var $button = $(this);
              var curPage = $button.parent().attr('data-cur-page'); //Add next page number to the button

              curPage = parseFloat(curPage) - 1;
              $button.parent().attr('data-cur-page', curPage); //Init button status

              $(prevTrigger).removeClass(triggerActive);
              $(nextTrigger).removeClass(triggerActive);
              $(nextTrigger).removeClass('is-hide'); // Active this button

              $button.addClass(triggerActive); //Perform dynamic loading

              if (customPostData != '') {
                defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": ' + curPage + ', ' + customPostData + ' }');
              } else {
                defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": ' + curPage + ' }');
              }

              ajaxLoadInit($this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, render, noneInfo);
              return false;
            });
          } else {
            //----------------- More Button ----------------
            //Add default page number to the button
            $(trigger).attr('data-cur-page', 1); //Hide the next button 

            if (totalPage == 1) {
              $(trigger).addClass('is-hide');
            } //Avoid using $( document ) to cause an asynchronous load without counting from 1


            $(trigger).off('click.POST_LIST_AJAX').on('click.POST_LIST_AJAX', function (e) {
              e.preventDefault();
              var $button = $(this);
              var curPage = $button.attr('data-cur-page'); //Add next page number to the button

              curPage = parseFloat(curPage) + 1;
              $button.attr('data-cur-page', curPage); // Active this button

              $button.addClass(triggerActive); //Perform dynamic loading

              if (customPostData != '') {
                defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": ' + curPage + ', ' + customPostData + ' }');
              } else {
                defaultPostData = JSON.parse('{ "' + pageParmStr.totalPage + '": ' + totalPage + ', "' + pageParmStr.displayPerPage + '": ' + perShow + ', "' + pageParmStr.currentPage + '": ' + curPage + ' }');
              }

              ajaxLoadInit($this, defaultPostData, $button, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, render, noneInfo);
              return false;
            });
          }
        } //end if

      }
    });
    /*
     * Ajax with JSON data
     *
     * @param  {Element} ajaxWrapper     - The outermost container of list.
     * @param  {Object} defaultPostData - Data to be sent to the server which is custom JSON fields.
     * @param  {String} trigger         - Trigger ajax loaded button object.
     * @param  {Number} curPage         - The current page to load.
     * @param  {Number} perShow         - The amount to load each time.
     * @param  {Number} totalPage       - The total page to load.
     * @param  {String} template7ID     - HTML template ID
     * @param  {String} jsonFile        - JSON file path to docking data
     * @param  {String} triggerActive   - The class name of trigger button actived.
     * @param  {String} pushContainer   - This container is used to display the loaded dynamic data.
     * @param  {String} method          - The type of request to make, which can be either "POST" or "GET".
     * @param  {String} render          - Rendering mode of display information. ==> before | html | append
     * @param  {String} noneInfo        - Returns information of ajax asynchronous callback when the content is empty.
     * @return {Void}
     */

    function ajaxLoadInit(ajaxWrapper, defaultPostData, trigger, curPage, totalPage, perShow, template7ID, jsonFile, triggerActive, pushContainer, method, render, noneInfo) {
      var $divRoot = ajaxWrapper,
          template = document.getElementById(template7ID).innerHTML,
          compiledTemplate = Template7.compile(template),
          $button = $(trigger); //hide the button and callback the information

      var returnEmptyInfo = function returnEmptyInfo() {
        $button.addClass('is-hide');
        $divRoot.after(noneInfo.none);
      };

      var returnDataError = function returnDataError() {
        $button.addClass('is-hide');
        $divRoot.after(noneInfo.error);
      }; // Add a request or response interceptor


      var axiosInterceptor = axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        //
        return config;
      }, function (error) {
        return Promise.reject(error);
      }); // To send data in the application/x-www-form-urlencoded format instead

      var formData = new FormData();

      for (var k in defaultPostData) {
        formData.append(k, defaultPostData[k]);
      } // Create a request event


      axios({
        timeout: 15000,
        method: method,
        url: jsonFile,
        data: formData,
        responseType: 'json'
      }).then(function (response) {
        var jsonData = response.data; //If the data is empty

        if (jsonData && (jsonData == null || Object.prototype.toString.call(jsonData.items) == '[object String]')) {
          returnEmptyInfo();
        } //Check if a key exists inside a json object


        if (jsonData && jsonData.hasOwnProperty('items') && Object.prototype.toString.call(jsonData.items) == '[object Array]') {
          //Data overflow may occur when the total number of pages is not posted
          try {
            var html = compiledTemplate(jsonData),
                curHtml = $divRoot.find(pushContainer).html();
            var result = null,
                htmlEl = null; //--------- Do or not append to the original content

            if (render == 'before') {
              result = curHtml + html;
              htmlEl = $(result);
              $divRoot.find(pushContainer).before(htmlEl);
            }

            if (render == 'html') {
              result = html;
              htmlEl = $(result);
              $divRoot.find(pushContainer).html(htmlEl);
            }

            if (render == 'append') {
              $divRoot.find(pushContainer).append(html);
            } //--------- Apply some asynchronism scripts


            $(document).UixApplyAsyncScripts({
              ajaxPostList: false
            }); //--------- Remove this button

            $button.removeClass(triggerActive); //--------- Hidden button when the page total number is set and does not equal -1 or 9999

            if (curPage == totalPage && totalPage != 9999 && totalPage != -1 && totalPage != 1) {
              returnEmptyInfo();
            }

            if (curPage == 1) {
              returnEmptyInfo();
            }
          } catch (err) {
            console.log(err.message);
            returnDataError();
          }
        } else {
          //if not array
          returnEmptyInfo();
        }
      })["catch"](function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          var status = error.response.status;
          console.log(status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request); //

          returnEmptyInfo();
        } else {
          // If there was a problem, we need to
          // dispatch the error condition
          console.log(error.message);
        }
      }); // Remove an interceptor later

      axios.interceptors.request.eject(axiosInterceptor);
    }
  };

  module.components.documentReady.push(module.POST_LIST_AJAX.documentReady);
  return function POST_LIST_AJAX() {
    list_posts_js_classCallCheck(this, POST_LIST_AJAX);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/fullwidth-column-to-edge/scss/_style.scss
var fullwidth_column_to_edge_scss_style = __webpack_require__(45);

// CONCATENATED MODULE: ./src/components/ES6/fullwidth-column-to-edge/js/index.js
function fullwidth_column_to_edge_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Full Width Column to Edge -->
 *************************************
 */


var FULL_WIDTH_COLUMN_TO_EDGE = function (module, $, window, document) {
  if (window.FULL_WIDTH_COLUMN_TO_EDGE === null) return false;
  module.FULL_WIDTH_COLUMN_TO_EDGE = module.FULL_WIDTH_COLUMN_TO_EDGE || {};
  module.FULL_WIDTH_COLUMN_TO_EDGE.version = '0.0.1';

  module.FULL_WIDTH_COLUMN_TO_EDGE.pageLoaded = function () {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    fullwidthColumnToEdgeInit(windowWidth);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth; // Do stuff here

        fullwidthColumnToEdgeInit(windowWidth);
      }
    });

    function fullwidthColumnToEdgeInit(w) {
      $('.js-uix-fullwidth-column-to-edge--extend-right').each(function () {
        fullwidthToDir($(this), 'right', w);
      });
      $('.js-uix-fullwidth-column-to-edge--extend-left').each(function () {
        fullwidthToDir($(this), 'left', w);
      });
    }

    function fullwidthToDir(obj, dir, w) {
      var dividerPosition = obj.offset();
      var dividerWidth = $(window).width() - dividerPosition.left;
      var bsGridGutter = 15;

      if (w > 768) {
        obj.css('width', dividerWidth + bsGridGutter);

        if (dir == 'left') {
          var _dis = -(dividerPosition.left + bsGridGutter * 2);

          obj.css('margin-left', _dis + 'px');
        }
      } else {
        obj.css('width', 'inherit');

        if (dir == 'left') {
          obj.css('margin-left', -bsGridGutter + 'px');
        }
      }
    }
  };

  module.components.pageLoaded.push(module.FULL_WIDTH_COLUMN_TO_EDGE.pageLoaded);
  return function FULL_WIDTH_COLUMN_TO_EDGE() {
    fullwidth_column_to_edge_js_classCallCheck(this, FULL_WIDTH_COLUMN_TO_EDGE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/login-templates/scss/_style.scss
var login_templates_scss_style = __webpack_require__(46);

// CONCATENATED MODULE: ./src/components/ES6/login-templates/js/index.js
function login_templates_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Login Templates -->
 *************************************
 */


var LOGIN_UI = function (module, $, window, document) {
  if (window.LOGIN_UI === null) return false;
  module.LOGIN_UI = module.LOGIN_UI || {};
  module.LOGIN_UI.version = '0.0.2';

  module.LOGIN_UI.documentReady = function ($) {
    var $loginToggle = $('.uix-special-login__toggle'),
        $loginForms = $('.uix-special-login__form');
    $loginToggle.data('switched', true).off('click').on('click', function (e) {
      e.preventDefault();
      var $form1 = $loginForms.eq(0),
          $form2 = $loginForms.eq(1);

      if ($(this).data('switched')) {
        $(this).data('switched', false);
        TweenMax.set($form2, {
          height: 'auto'
        });
        TweenMax.from($form2, 0.5, {
          height: 0
        });
        TweenMax.to($form1, 0.5, {
          height: 0
        }); // Switches the Icon

        $(this).find('> span i').eq(0).hide();
        $(this).find('> span i').eq(1).show();
      } else {
        $(this).data('switched', true);
        TweenMax.set($form1, {
          height: 'auto'
        });
        TweenMax.from($form1, 0.5, {
          height: 0
        });
        TweenMax.to($form2, 0.5, {
          height: 0
        }); // Switches the Icon

        $(this).find('> span i').eq(1).hide();
        $(this).find('> span i').eq(0).show();
      }
    });
  };

  module.components.documentReady.push(module.LOGIN_UI.documentReady);
  return function LOGIN_UI() {
    login_templates_js_classCallCheck(this, LOGIN_UI);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/modal-dialog/js/fn/fire-modal-dialog.js
var fire_modal_dialog = __webpack_require__(47);

// EXTERNAL MODULE: ./src/components/ES6/modal-dialog/js/fn/close-modal-dialog.js
var close_modal_dialog = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/ES6/modal-dialog/scss/_style.scss
var modal_dialog_scss_style = __webpack_require__(49);

// CONCATENATED MODULE: ./src/components/ES6/modal-dialog/js/index.js
function modal_dialog_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function modal_dialog_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { modal_dialog_js_typeof = function _typeof(obj) { return typeof obj; }; } else { modal_dialog_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return modal_dialog_js_typeof(obj); }

/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */

/**
 * module.MODAL_DIALOG
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */




var MODAL_DIALOG = function (module, $, window, document) {
  if (window.MODAL_DIALOG === null) return false;
  module.MODAL_DIALOG = module.MODAL_DIALOG || {};
  module.MODAL_DIALOG.version = '0.1.5';

  module.MODAL_DIALOG.documentReady = function ($) {
    //Delay Time when Full Screen Effect is fired.
    var modalSpeed = UixCssProperty.getTransitionDuration($('.uix-modal-box:first')[0]); // To display the template tag content.

    $('template').each(function () {
      var _content = $(this).html(function (index, html) {
        return html.replace(/[\r\n]/g, '');
      }).context.innerHTML,
          _id = $(this).attr('id'); //If it is dialog, clone the contents of the <template> into the body


      if (modal_dialog_js_typeof(_id) !== ( true ? "undefined" : undefined) && !$('body').hasClass(_id) && $('<div>' + _content + '</div>').find('[role="dialog"]').length > 0) {
        //reset id
        $(this).removeAttr('id');
        $('body').addClass(_id); //append content to body

        $(_content.replace(/role=[\'\"]dialog[\'\"]/, 'role="dialog" id="' + _id + '"')).appendTo('body');
      }
    });
    /*
      * Unbind that one in a safe way that won't accidentally unbind other click handlers.
      * In order to trigger other custom Modal Dialog events.
    	
    	$( '#element' ).off( 'click.MODAL_DIALOG' );
    	$( '#element' ).off( 'click.MODAL_DIALOG_CLOSE' );
    	
    */
    //Add modal mask to stage

    if ($('.uix-modal-mask').length == 0) {
      $('body').prepend('<div class="uix-modal-mask"></div>');
    }

    $(document).off('click.MODAL_DIALOG').on('click.MODAL_DIALOG', '[data-modal-id]', function () {
      var dataH = $(this).data('modal-height'),
          dataW = $(this).data('modal-width'),
          lightbox = $(this).data('modal-lightbox'),
          closeTime = $(this).data('modal-close-time'),
          closeOnlyBtn = $(this).data('modal-close-onlybtn');

      if (modal_dialog_js_typeof(dataH) === ( true ? "undefined" : undefined)) {
        dataH = false;
      }

      if (modal_dialog_js_typeof(dataW) === ( true ? "undefined" : undefined)) {
        dataW = false;
      }

      if (modal_dialog_js_typeof(lightbox) === ( true ? "undefined" : undefined)) {
        lightbox = true;
      }

      if (modal_dialog_js_typeof(closeTime) === ( true ? "undefined" : undefined)) {
        closeTime = false;
      }

      if (modal_dialog_js_typeof(closeOnlyBtn) === ( true ? "undefined" : undefined)) {
        closeOnlyBtn = false;
      }

      $(document).UixFireModalDialog({
        id: $(this).data('modal-id'),
        height: dataH,
        width: dataW,
        speed: modalSpeed,
        btn: $(this),
        lightbox: lightbox,
        autoClose: closeTime,
        closeOnlyBtn: closeOnlyBtn
      });
      return false;
    });
    $(document).off('click.MODAL_DIALOG_CLOSE').on('click.MODAL_DIALOG_CLOSE', '.uix-modal-box [data-modal-close-trigger], .uix-modal-mask:not(.js-uix-disabled)', function () {
      //btn
      if ($(this).hasClass('uix-modal-box__close')) {
        $(this).parent().removeClass('is-active');
      }

      $(document).UixCloseModalDialog();
      return false;
    });
  };

  module.components.documentReady.push(module.MODAL_DIALOG.documentReady);
  return function MODAL_DIALOG() {
    modal_dialog_js_classCallCheck(this, MODAL_DIALOG);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/mousewheel-interaction/js/index.js
function mousewheel_interaction_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Mousewheel Interaction -->
 *************************************
 */

var MOUSEWHEEL_INTERACTION = function (module, $, window, document) {
  if (window.MOUSEWHEEL_INTERACTION === null) return false;
  module.MOUSEWHEEL_INTERACTION = module.MOUSEWHEEL_INTERACTION || {};
  module.MOUSEWHEEL_INTERACTION.version = '0.0.3';

  module.MOUSEWHEEL_INTERACTION.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if (!$('body').hasClass('mousewheel-interaction')) return false; //Determine the direction of a jQuery scroll event
    //Fix an issue for mousewheel event is too fast.

    var quietPeriod = 500,
        //Do not change it
    animationTime = 1000; //According to page transition animation changes

    var lastAnimation = 0;
    var scrollCount = 0;
    var startY = 0;

    var onTouchStart = function onTouchStart(e) {
      var touches = e.touches;

      if (touches && touches.length) {
        startY = touches[0].pageY;
      }
    };

    var onDeviceWheel = function onDeviceWheel(e) {
      //Gets a value that indicates the amount that the mouse wheel has changed.
      var dir,
          delta,
          mobileDeltaY = null;
      var touches = e.touches;

      if (touches && touches.length) {
        mobileDeltaY = startY - touches[0].pageY;
      } else {
        delta = Math.max(-1, Math.min(1, -e.deltaY));
      }

      if (mobileDeltaY != null) {
        if (mobileDeltaY >= 50) {
          //--- swipe up
          dir = 'up';
        }

        if (mobileDeltaY <= -50) {
          //--- swipe down
          dir = 'down';
        }
      } else {
        if (delta < 0) {
          //scroll down
          dir = 'down';
        } else {
          //scroll up
          dir = 'up';
        }
      }

      scrollMoveInit(e, dir);
    };

    window.addEventListener('wheel', onDeviceWheel, browser.supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('touchstart', onTouchStart, browser.supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('touchmove', onDeviceWheel, browser.supportsPassive ? {
      passive: true
    } : false);
    /*
     * Scroll initialize
     *
     * @param  {Event} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
     * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
     * @return {Void}
     */

    function scrollMoveInit(event, dir) {
      var timeNow = new Date().getTime(); // Cancel scroll if currently animating or within quiet period

      if (timeNow - lastAnimation < quietPeriod + animationTime) {
        return;
      }

      if (dir == 'down') {
        //scroll down
        $('#demo-mousewheel-interaction-status').html('Direction: down, Total: ' + scrollCount);
        scrollCount++;
      } else {
        //scroll up
        $('#demo-mousewheel-interaction-status').html('Direction: up, Total: ' + scrollCount);
        scrollCount++;
      }

      lastAnimation = timeNow;
    }
  };

  module.components.documentReady.push(module.MOUSEWHEEL_INTERACTION.documentReady);
  return function MOUSEWHEEL_INTERACTION() {
    mousewheel_interaction_js_classCallCheck(this, MOUSEWHEEL_INTERACTION);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/multi-items-carousel/scss/_style.scss
var multi_items_carousel_scss_style = __webpack_require__(50);

// CONCATENATED MODULE: ./src/components/ES6/multi-items-carousel/js/index.js
function multi_items_carousel_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function multi_items_carousel_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { multi_items_carousel_js_typeof = function _typeof(obj) { return typeof obj; }; } else { multi_items_carousel_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return multi_items_carousel_js_typeof(obj); }

/* 
 *************************************
 * <!-- Multiple Items Carousel -->
 *************************************
 */

/**
 * module.MULTI_ITEMS_CAROUSEL
 * 
 * @requires ./examples/assets/js/min/hammer.min.js
 */


var MULTI_ITEMS_CAROUSEL = function (module, $, window, document) {
  if (window.MULTI_ITEMS_CAROUSEL === null) return false;
  module.MULTI_ITEMS_CAROUSEL = module.MULTI_ITEMS_CAROUSEL || {};
  module.MULTI_ITEMS_CAROUSEL.version = '0.0.4';

  module.MULTI_ITEMS_CAROUSEL.documentReady = function ($) {
    $('.uix-multi-carousel').each(function () {
      var $carouselWrapper = $(this),
          goSteps = 0,
          $carousel = $carouselWrapper.find('.uix-multi-carousel__items'),
          $carouselItem = $carouselWrapper.find('.uix-multi-carousel__items > div'),
          itemTotal = $carouselItem.length,
          amountVisible = $carouselWrapper.data('cus-carousel-show'),
          carouselItemWidth = null,
          carouselItemHeight = null,
          carouselDir = $carouselWrapper.data('cus-carousel-dir'),
          carouselLoop = $carouselWrapper.data('cus-carousel-loop'),
          carouselSpeed = $carouselWrapper.data('cus-carousel-speed'),
          carouselNext = $carouselWrapper.data('cus-carousel-next'),
          carouselPrev = $carouselWrapper.data('cus-carousel-prev'),
          carouselPaging = $carouselWrapper.data('cus-carousel-paging'),
          carouseDraggable = $carouselWrapper.data('cus-carousel-draggable'),
          carouseDraggableCursor = $carouselWrapper.data('cus-carousel-draggable-cursor');
      if (multi_items_carousel_js_typeof(carouselDir) === ( true ? "undefined" : undefined)) carouselDir = 'horizontal';
      if (multi_items_carousel_js_typeof(carouselLoop) === ( true ? "undefined" : undefined)) carouselLoop = false;
      if (multi_items_carousel_js_typeof(amountVisible) === ( true ? "undefined" : undefined)) amountVisible = 3;
      if (multi_items_carousel_js_typeof(carouselSpeed) === ( true ? "undefined" : undefined)) carouselSpeed = 250;
      if (multi_items_carousel_js_typeof(carouselNext) === ( true ? "undefined" : undefined)) carouselNext = '.uix-multi-carousel__controls--next';
      if (multi_items_carousel_js_typeof(carouselPrev) === ( true ? "undefined" : undefined)) carouselPrev = '.uix-multi-carousel__controls--prev';
      if (multi_items_carousel_js_typeof(carouseDraggable) === ( true ? "undefined" : undefined)) carouseDraggable = false;
      if (multi_items_carousel_js_typeof(carouseDraggableCursor) === ( true ? "undefined" : undefined)) carouseDraggableCursor = 'move';
      if (window.innerWidth <= 768) amountVisible = 3;
      carouselItemWidth = $carousel.width() / amountVisible;
      carouselItemHeight = $carousel.height() / amountVisible;
      /* 
       ---------------------------
       Get the number of steps to the last visible element
       ---------------------------
       */

      var lastSteps = parseFloat(itemTotal - amountVisible);
      /* 
       ---------------------------
       Initialize carousel
       ---------------------------
       */

      var newWidth, newHeight;

      if (carouselDir == 'horizontal') {
        newWidth = $carouselWrapper.width() / amountVisible;
        $carousel.css('width', itemTotal * carouselItemWidth);
      } else {
        newHeight = $carouselWrapper.height() / amountVisible;
        $carousel.css('height', itemTotal * carouselItemHeight);
      } // Re-order all items


      carouselReOrder(); //default button status

      if ($carouselItem.first().data('id') == 1 && !carouselLoop) {
        $(carouselPrev).addClass('is-disabled');
      }
      /* 
       ---------------------------
       Re-order all items
       ---------------------------
       */


      function carouselReOrder() {
        //Active the center item
        carouselActiveCenterItem($carouselItem, 'default', null);
        $carouselItem.each(function (index) {
          if (carouselDir == 'horizontal') {
            $(this).width(newWidth + 'px').css('visibility', 'visible').attr('data-id', index + 1);
          } else {
            $(this).height(newHeight + 'px').css('visibility', 'visible').attr('data-id', index + 1);
          }
        });
      }
      /* 
       ---------------------------
       Active the center item
       ---------------------------
       */


      function carouselActiveCenterItem(el, dir, steps) {
        var curItemIndex = (amountVisible / 2).toFixed(0),
            centerItemIndex = Math.floor(amountVisible / 2) - 1;
        el.removeClass('is-active active-prev active-next');

        if (dir == 'default') {
          el.eq(parseFloat(curItemIndex - 1)).addClass('is-active');
        } else {
          el.eq(parseFloat(steps + centerItemIndex + 1)).addClass('is-active');
        } //Add nearest classes for 3 elements


        el.each(function () {
          if ($(this).hasClass('is-active')) {
            $(this).prev().addClass('active-prev');
            $(this).next().addClass('active-next');
            return false;
          }
        });
      }
      /* 
       ---------------------------
       Move left/up
       ---------------------------
       */


      $(carouselNext).off('click').on('click', $carouselWrapper, function (e) {
        e.preventDefault();
        var $btn = $(this),
            $curWrapper = $(e.data[0]),
            //Protection button is not triggered multiple times.
        btnLock = $btn.data('click');

        if (multi_items_carousel_js_typeof(btnLock) === ( true ? "undefined" : undefined) || btnLock === 0) {
          goSteps++; //Loop items

          if (carouselLoop) {
            if (goSteps > lastSteps) goSteps = 0;
          } else {
            if (goSteps > lastSteps) goSteps = lastSteps;
          }

          itemUpdates($curWrapper, $btn, carouselNext, carouselPrev, goSteps);
        }
      });
      /* 
       ---------------------------
       Move right/down
       ---------------------------
       */

      $(carouselPrev).off('click').on('click', $carouselWrapper, function (e) {
        e.preventDefault();
        var $btn = $(this),
            $curWrapper = $(e.data[0]),
            //Protection button is not triggered multiple times.
        btnLock = $btn.data('click');

        if (multi_items_carousel_js_typeof(btnLock) === ( true ? "undefined" : undefined) || btnLock === 0) {
          goSteps--; //Loop items

          if (carouselLoop) {
            if (goSteps < 0) goSteps = lastSteps;
          } else {
            if (goSteps < 0) goSteps = 0;
          }

          itemUpdates($curWrapper, $btn, carouselNext, carouselPrev, goSteps);
        }
      }); //Solve the activation problem of touch events
      //-------------------------------------	

      $carouselItem.on('click touchstart', function () {
        $carouselItem.removeClass('active-current');
        $(this).addClass('active-current');
      }); //Drag and Drop
      //-------------------------------------	

      var $dragDropTrigger = $carouselWrapper;
      var hammerProps = {}; //Make the cursor a move icon when a user hovers over an item

      if (carouseDraggable && carouseDraggableCursor != '' && carouseDraggableCursor != false) $dragDropTrigger.css('cursor', carouseDraggableCursor);

      if (!carouseDraggable) {
        hammerProps = {
          inputClass: Hammer.TouchInput
        };
      } //Mouse event
      //Hammer.js pan event only for touch devices and not for desktop computer Click+Drag


      var direction;
      var dragDropElement = $dragDropTrigger[0],
          dragDropMC = new Hammer(dragDropElement, hammerProps);
      dragDropMC.on('panright press panleft panup pandown', function (ev) {
        //Set the direction in here
        direction = ev.type;
      });
      dragDropMC.on('panend', function (ev) {
        //Use the direction in here
        //You know the pan has ended
        //and you know which action they were taking
        if (direction == 'panleft' || direction == 'panup') {
          goSteps++; //Loop items

          if (carouselLoop) {
            if (goSteps > lastSteps) goSteps = 0;
          } else {
            if (goSteps > lastSteps) goSteps = lastSteps;
          }

          itemUpdates($carouselWrapper, false, carouselNext, carouselPrev, goSteps);
        }

        if (direction == 'panright' || direction == 'pandown') {
          goSteps--; //Loop items

          if (carouselLoop) {
            if (goSteps < 0) goSteps = lastSteps;
          } else {
            if (goSteps < 0) goSteps = 0;
          }

          itemUpdates($carouselWrapper, false, carouselNext, carouselPrev, goSteps);
        }
      });
      /*
       * Transition Between Items
       *
       * @param  {Element} wrapper         - Wrapper of carousel.
       * @param  {?Element} curBtn          - The button that currently triggers the move.
       * @param  {String} nextBtnStr      - The button ID or class that triggers the next move.
       * @param  {String} prevBtnStr      - The button ID or class that triggers the previous move.
       * @param  {Number} steps           - The number of steps per move.
       * @return {Void}
       */

      function itemUpdates(wrapper, curBtn, nextBtnStr, prevBtnStr, steps) {
        var $curWrapper = wrapper.children('.uix-multi-carousel__items'),
            //Default: $carousel
        $curItems = $curWrapper.find('> div'),
            //Default: $carouselItem
        isEnd = false,
            isFirst = false,
            isMid = false; //Reset prevents code from duplicate run

        var preventEvent = function preventEvent() {
          if (curBtn) curBtn.data('click', 0);
        }; //Determine if the element is at the end or beginning


        if (steps == lastSteps) isEnd = true;
        if (steps == 0) isFirst = true;
        if (steps < lastSteps && steps > 0) isMid = true; //The state of the control button

        if (!carouselLoop) {
          if (isEnd) $(nextBtnStr).addClass('is-disabled');
          if (isFirst) $(prevBtnStr).addClass('is-disabled');

          if (isMid) {
            $(nextBtnStr).removeClass('is-disabled');
            $(prevBtnStr).removeClass('is-disabled');
          }
        } //Avoid button repeated trigger


        if (curBtn) curBtn.data('click', 1); //Clone the first element to the last position

        if (carouselDir == 'horizontal') {
          TweenMax.to($curWrapper, carouselSpeed / 1000, {
            x: '-' + carouselItemWidth * steps,
            onComplete: function onComplete() {
              //Active the center item
              carouselActiveCenterItem($curItems, 'move', steps); //Reset prevents code from duplicate run

              preventEvent();
            }
          });
        } else {
          TweenMax.to($curWrapper, carouselSpeed / 1000, {
            y: '-' + carouselItemHeight * steps,
            onComplete: function onComplete() {
              //Active the center item
              carouselActiveCenterItem($curItems, 'move', steps); //Reset prevents code from duplicate run

              preventEvent();
            }
          });
        }
      }
    });
  };

  module.components.documentReady.push(module.MULTI_ITEMS_CAROUSEL.documentReady);
  return function MULTI_ITEMS_CAROUSEL() {
    multi_items_carousel_js_classCallCheck(this, MULTI_ITEMS_CAROUSEL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document); //
//export const MULTI_ITEMS_CAROUSEL = ( ( module, $, window, document ) => {
//	if ( window.MULTI_ITEMS_CAROUSEL === null ) return false;
//	
//	
//    module.MULTI_ITEMS_CAROUSEL               = module.MULTI_ITEMS_CAROUSEL || {};
//	  module.MULTI_ITEMS_CAROUSEL.version       = '0.0.1';
//    module.MULTI_ITEMS_CAROUSEL.documentReady = function( $ ) {
//
//		$( '.uix-multi-carousel' ).each( function()  {
//
//			let $carouselWrapper   = $( this ),
//				$carousel          = $carouselWrapper.find( '.uix-multi-carousel__items' ),
//				$carouselItem      = $carouselWrapper.find( '.uix-multi-carousel__items > div' ),
//				carouselItemTotal  = $carouselItem.length,
//				showcarouselItem   = $carouselWrapper.data( 'cus-carousel-show' ),
//				carouselItemWidth  = $carousel.width()/showcarouselItem,
//				carouselItemHeight = $carousel.height()/showcarouselItem,
//				carouselDir        = $carouselWrapper.data( 'cus-carousel-dir' ),
//				carouselLoop       = $carouselWrapper.data( 'cus-carousel-loop' ),
//				carouselSpeed      = $carouselWrapper.data( 'cus-carousel-speed' ),
//				carouselNext       = $carouselWrapper.data( 'cus-carousel-next' ),
//				carouselPrev       = $carouselWrapper.data( 'cus-carousel-prev' );
//
//			if ( typeof carouselDir === typeof undefined ) {
//				carouselDir = 'horizontal';
//			}
//			
//			if ( typeof carouselLoop === typeof undefined ) {
//				carouselLoop = false;
//			}
//			if ( typeof showcarouselItem === typeof undefined ) {
//				showcarouselItem = 3;
//			}
//			if ( typeof carouselSpeed === typeof undefined ) {
//				carouselSpeed = 250;
//			}
//			if ( typeof carouselNext === typeof undefined ) {
//				carouselNext = '.uix-multi-carousel__controls--next';
//			}
//			if ( typeof carouselPrev === typeof undefined ) {
//				carouselPrev = '.uix-multi-carousel__controls--prev';
//			}
//
//
//			
//			/* 
//			 ---------------------------
//			 Initialize carousel
//			 ---------------------------
//			 */  
//			let newWidth, newHeight;
//			if ( carouselDir == 'horizontal' ) { 
//				newWidth = ( $carouselWrapper.width() / showcarouselItem );
//				$carousel.css( 'width', carouselItemTotal * carouselItemWidth );
//			} else {
//				newHeight = ( $carouselWrapper.height() / showcarouselItem );
//				$carousel.css( 'height', carouselItemTotal * carouselItemHeight );
//			}
//
//
//			// Re-order all items
//			carouselReOrder();
//
//
//
//			//default button status
//			if ( $carouselItem.first().data( 'id' ) == 1 && !carouselLoop ) {
//				$( carouselPrev ).addClass( 'is-disabled' );
//			}	
//
//			/* 
//			 ---------------------------
//			 Re-order all items
//			 ---------------------------
//			 */ 
//			
//			function carouselReOrder() {
//				
//				//Active the center item
//				carouselActiveCenterItem( $carouselItem, 'default' );
//				
//				$carouselItem.each( function( index ) {
//				
//
//						if ( carouselDir == 'horizontal' ) {
//							$( this )
//								.width( newWidth + 'px' )
//								.css( 'visibility', 'visible' )
//								.attr( 'data-id', index+1 );
//						} else {
//							$( this )
//								.height( newHeight + 'px' )
//								.css( 'visibility', 'visible' )
//								.attr( 'data-id', index+1 );
//						}
//
//					});	
//			}
//			
//			/* 
//			 ---------------------------
//			 Active the center item
//			 ---------------------------
//			 */ 
//			
//			function carouselActiveCenterItem( el, dir ) {
//				const curItemIndex    = (showcarouselItem/2).toFixed(0),
//					  centerItemIndex = Math.floor(showcarouselItem / 2)-1;		
//				el.removeClass( 'is-active active-prev active-next' );
//				
//				
//				
//				if ( dir == 'left' ) {
//					el.eq( curItemIndex ).addClass( 'is-active' );
//					
//				} else if ( dir == 'right' ) {
//					el.eq( centerItemIndex ).addClass( 'is-active' );	
//					
//				} else if ( dir == 'default' ) {
//					el.eq( curItemIndex - 1 ).addClass( 'is-active' );		
//				}
//				
//				//Add nearest classes for 3 elements
//				el.each( function() {
//					if ( $( this ).hasClass( 'is-active' ) ) {
//						$( this ).prev().addClass( 'active-prev' );
//						$( this ).next().addClass( 'active-next' );
//						
//						return false;
//					}
//				});	
//				
//				
//				
//			}	
//			
//
//			
//			
//			/* 
//			 ---------------------------
//			 Move left/up
//			 ---------------------------
//			 */ 
//			$( carouselNext ).off( 'click' ).on( 'click', $carouselWrapper, function( e ) {
//				e.preventDefault();
//				
//				
//				const $btn        = $( this ),
//					  $curWrapper = $( e.data[0] ),
//					  $curItems   = $curWrapper.children().find( '> div' ),
//					  //Protection button is not triggered multiple times.
//					  btnLock     = $btn.data( 'click' );
//				
//				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
//					moveNext( $curWrapper, $curItems, $btn, carouselNext, carouselPrev );
//				}
//
//
//			});
//
//			
//			/* 
//			 ---------------------------
//			 Move right/down
//			 ---------------------------
//			 */ 
//			$( carouselPrev ).off( 'click' ).on( 'click', $carouselWrapper, function( e ) {
//				e.preventDefault();
//
//				
//				const $btn        = $( this ),
//					  $curWrapper = $( e.data[0] ),
//					  $curItems   = $curWrapper.children().find( '> div' ),
//					  //Protection button is not triggered multiple times.
//					  btnLock     = $btn.data( 'click' );
//
//			
//				
//				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
//					movePrev( $curWrapper, $curItems, $btn, carouselNext, carouselPrev );
//				}
//				
//				
//
//			});
//			
//			
//			
//			/*
//			 * Transition between items next (left/up)
//			 *
//			 * @param  {Element} wrapper         - Wrapper of carousel.
//			 * @param  {Element} items           - Items of carousel.
//			 * @param  {?Element} curBtn          - The button that currently triggers the move.
//			 * @param  {String} nextBtnStr      - The button ID or class that triggers the next move.
//			 * @param  {String} prevBtnStr      - The button ID or class that triggers the previous move.
//			 * @return {Void}
//			 */
//			function moveNext( wrapper, items, curBtn, nextBtnStr, prevBtnStr ) {
//
//		
//				let $curWrapper = wrapper,  //Default: $carousel
//					$curItems   = items,  //Default: $carouselItem
//					isEnd       = false,
//					$cloneItem  = null;
//					
//
//				//Move to the end
//				if ( (carouselItemTotal - showcarouselItem + 1) == $curItems.first().data( 'id' ) ) {
//					isEnd = true;
//				}
//				if ( (carouselItemTotal - showcarouselItem) == $curItems.first().data( 'id' ) && !carouselLoop ) {
//					if ( curBtn ) curBtn.addClass( 'is-disabled' );
//				}
//				
//				
//				//Loop items
//				if ( carouselLoop ) {
//					isEnd = false;
//				}
//				
//				//Reset prevents code from duplicate run
//				const preventEvent = function() {
//					if ( carouselPrev && carouselPrev != '' ) {
//						$( carouselPrev ).data( 'click', 0 ).removeClass( 'is-disabled' );
//					}
//
//					if ( curBtn ) curBtn.data( 'click', 0 );
//			
//				};
//				
//				if ( !isEnd ) {
//
//
//					//Avoid button repeated trigger
//					if ( curBtn ) curBtn.data( 'click', 1 );
//
//
//
//					//Clone the first element to the last position
//					if ( carouselDir == 'horizontal' ) {
//
//						TweenMax.to( $curItems.first(), carouselSpeed/1000, {
//							css: {
//								marginLeft : -carouselItemWidth
//							},
//							onComplete : function() {
//
//								//Initialize each item "margin-left"
//								$curItems.css( 'margin-left', 0 );
//
//								//Clone the first element to the last position
//								$curItems
//									.first()
//									.clone()
//									.appendTo( $carousel );
//
//
//								//Remove duplicate elements
//								this.target.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'left' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//								
//
//							}
//						});		
//						
//					
//
//
//					} else {
//
//
//
//						TweenMax.to( $curItems.first(), carouselSpeed/1000, {
//							css: {
//								marginTop : -carouselItemHeight
//							},
//							onComplete : function() {
//
//								//Initialize each item "margin-top"
//								$curItems.css( 'margin-top', 0 );
//
//								//Clone the first element to the last position
//								$curItems
//									.first()
//									.clone()
//									.appendTo( $carousel );
//
//
//								//Remove duplicate elements
//								this.target.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'left' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//
//
//							}
//						});		
//
//
//					}
//
//
//
//				}// end isEnd
//				
//				
//
//					
//
//			}
//	
//			
//			
//			
//			/*
//			 * Transition between items previously (right/down)
//			 *
//			 * @param  {Element} wrapper         - Wrapper of carousel.
//			 * @param  {Element} items           - Items of carousel.
//			 * @param  {?Element} curBtn          - The button that currently triggers the move.
//			 * @param  {String} nextBtnStr      - The button ID or class that triggers the next move.
//			 * @param  {String} prevBtnStr      - The button ID or class that triggers the previous move.
//			 * @return {Void}
//			 */
//			function movePrev( wrapper, items, curBtn, nextBtnStr, prevBtnStr ) {
//
//		
//				let $curWrapper = wrapper,  //Default: $carousel
//					$curItems   = items,  //Default: $carouselItem
//					isEnd       = false,
//					$cloneItem  = null;
//					
//
//				
//				//Move to the end
//				if ( 1 == $curItems.first().data( 'id' ) ) {
//					isEnd = true;
//				}
//				if ( 2 == $curItems.first().data( 'id' ) && !carouselLoop ) {
//					if ( curBtn ) curBtn.addClass( 'is-disabled' );
//				}
//				
//				
//				//Loop items
//				if ( carouselLoop ) {
//					isEnd = false;
//				}
//				
//				//Reset prevents code from duplicate run
//				const preventEvent = function() {
//					if ( carouselNext && carouselNext != '' ) {
//						$( carouselNext ).data( 'click', 0 ).removeClass( 'is-disabled' );
//					}
//
//					if ( curBtn ) curBtn.data( 'click', 0 );
//			
//				};
//				
//				if ( !isEnd ) {
//
//
//					//Avoid button repeated trigger
//					if ( curBtn ) curBtn.data( 'click', 1 );
//
//
//
//					//Clone the first element to the last position
//					if ( carouselDir == 'horizontal' ) {
//
//						$cloneItem = $curItems.last().clone();
//
//
//						//Clone the last element to the first position
//						$cloneItem
//							.prependTo( $carousel )
//							.css( 'margin-left', -carouselItemWidth + 'px' );
//
//
//						TweenMax.to( $cloneItem, carouselSpeed/1000, {
//							css: {
//								marginLeft : 0
//							},
//							onComplete : function() {
//
//								//Remove duplicate elements
//								$curItems
//									.last()
//									.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'right' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//								
//						
//
//
//
//							}
//						});
//						
//
//
//
//					} else {
//
//
//						$cloneItem = $curItems.last().clone();
//
//
//						//Clone the last element to the first position
//						$cloneItem
//							.prependTo( $carousel )
//							.css( 'margin-top', -carouselItemHeight + 'px' );
//
//
//						TweenMax.to( $cloneItem, carouselSpeed/1000, {
//							css: {
//								marginTop : 0
//							},
//							onComplete : function() {
//
//								//Remove duplicate elements
//								$curItems
//									.last()
//									.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'right' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//
//
//
//							}
//						});
//
//
//
//					}
//
//
//
//				}// end isEnd
//				
//				
//
//					
//
//			}
//
//
//
//
//
//		});		
//		
//    };
//
//    module.components.documentReady.push( module.MULTI_ITEMS_CAROUSEL.documentReady );
//
//	return class MULTI_ITEMS_CAROUSEL {
//		constructor() {
//			this.module = module;
//		}
//		
//	};
//	
//})( UixModuleInstance, jQuery, window, document );
// CONCATENATED MODULE: ./src/components/ES6/one-page/js/index.js
function one_page_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Full Page/One Page Transition -->
 *************************************
 */

/**
 * module.ONEPAGE
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */

var ONEPAGE = function (module, $, window, document) {
  if (window.ONEPAGE === null) return false;
  module.ONEPAGE = module.ONEPAGE || {};
  module.ONEPAGE.version = '0.0.8';

  module.ONEPAGE.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //Determine the direction of a jQuery scroll event
    //Fix an issue for mousewheel event is too fast.

    var quietPeriod = 500,
        //Do not change it
    animationTime = 1000,
        //According to page transition animation changes
    $sectionsContainer = $('.uix-normal-load__onepage-container'),
        $sections = $sectionsContainer.find('[data-highlight-section]'),
        sectionTotal = $sections.length,

    /* topSpacing         = ( window.innerWidth <= 768 ) ? 0 : $( '.uix-header__container' ).outerHeight( true ), //with margin */
    topSpacing = 0,
        $primaryMenu = $('.uix-menu'),
        $sidefixedMenu = $('.uix-menu-sidefixed');
    var lastAnimation = 0; //Prevent this module from loading in other pages

    if ($sectionsContainer.length == 0) return false; // Prepare everything before binding wheel scroll

    $.each($sections, function (i) {
      $(this).attr('data-index', i);

      if (i == 0) {
        $(this).addClass('is-active');
      }
    }); //Init the section location

    sectionStart(); //Detect URL change

    $(window).on('hashchange', function () {
      var hash = window.location.hash,
          locArr,
          loc;

      if (hash) {
        //Add hashchange event
        locArr = hash.split('section-');
        loc = locArr[1];
        moveTo($sectionsContainer, false, loc);
      }
    });
    /*
     * Init the section location
     *
     * @return {Void}
     */

    function sectionStart() {
      setTimeout(function () {
        var hash = window.location.hash,
            locArr,
            loc,
            curTab;

        if (hash) {
          //Add hashchange event
          locArr = hash.split('section-');
          loc = locArr[1];
          moveTo($sectionsContainer, false, loc);
        } else {
          moveTo($sectionsContainer, false, 1);
        }
      }, quietPeriod);
    }
    /*
     * Scroll initialize
     *
     * @param  {Event} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
     * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
     * @return {Void}
     */


    function scrollMoveInit(event, dir) {
      var timeNow = new Date().getTime(); // Cancel scroll if currently animating or within quiet period

      if (timeNow - lastAnimation < quietPeriod + animationTime) {
        return;
      }

      if (dir == 'down') {
        //scroll down
        moveTo($sectionsContainer, 'down', false);
      } else {
        //scroll up
        moveTo($sectionsContainer, 'up', false);
      }

      lastAnimation = timeNow;
    }
    /*
     * Move Animation
     *
     * @param  {Element} el           - The container of each sections.
     * @param  {String} dir          - Rolling direction indicator.
     * @param  {Number} hashID       - ID of custom hashchange event.
     * @return {Void}
     */


    function moveTo(el, dir, hashID) {
      var index = parseFloat($sections.filter('.is-active').attr('data-index')),
          isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
      var nextIndex = null,
          $next = null;

      if (dir == 'down' || dir === false) {
        nextIndex = index + 1;
      } else {
        nextIndex = index - 1;
      } //ID of custom hashchange event


      if (isNumeric.test(hashID)) nextIndex = parseFloat(hashID - 1);

      if (nextIndex <= parseFloat(sectionTotal - 1) && nextIndex >= 0) {
        if (nextIndex > parseFloat(sectionTotal - 1)) nextIndex = parseFloat(sectionTotal - 1);
        if (nextIndex < 0) nextIndex = 0; //Returns the target section

        $next = $sections.eq(nextIndex); //Smooth scroll to content

        if ($next.length > 0) {
          TweenMax.to(window, animationTime / 1000, {
            scrollTo: {
              y: $next.offset().top - topSpacing,
              autoKill: false
            },
            ease: Power2.easeOut,
            onComplete: function onComplete() {
              $sections.removeClass('leave');
              $sections.eq(index).addClass('leave');
              $sections.removeClass('is-active');
              $next.addClass('is-active').removeClass('leave'); //Changing The Site URL

              var curSectionIndex = $sections.filter('.is-active').index() + 1,
                  href = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + $sections.filter('.is-active').attr('id'); // Save state on history stack
              // - First argument is any object that will let you restore state
              // - Second argument is a title (not the page title, and not currently used)
              // - Third argument is the URL - this will appear in the browser address bar

              history.pushState({}, document.title, href);
              console.log('Section ' + curSectionIndex + ' loaded!');
            }
          });
        }
      }
    }
    /* 
     ====================================================
     *  Navigation Interaction
     ====================================================
     */


    goPageSection($primaryMenu);
    goPageSection($sidefixedMenu); //Activate the first item

    $primaryMenu.find('li:first').addClass('is-active');
    $sidefixedMenu.find('li:first').addClass('is-active');
    /*
     * Get section or article by href
     *
     * @param  {String|Object} el  - The current selector or selector ID
     * @return {Object}             - A new selector.
     */

    function getRelatedContent(el) {
      return $($(el).attr('href'));
    }
    /*
     * Get link by section or article id
     *
     * @param  {String|Element} el    - The current selector or selector ID
     * @param  {Element} menuObj       - Returns the menu element within the document.
     * @param  {Boolean} echoIndex    - Whether to return the current index.
     * @return {Object}               - A new selector.
     */


    function getRelatedNavigation(el, menuObj, echoIndex) {
      if (echoIndex) {
        return menuObj.find('li > a[href=#' + $(el).attr('id') + ']').parent('li').index();
      } else {
        return menuObj.find('li > a[href=#' + $(el).attr('id') + ']').parent('li');
      }
    }
    /*
     * Get all links by section or article
     *
     * @param  {Element} menuObj     - Returns the menu element within the document.
     * @return {Element}             - A new selector.
     */


    function getAllNavigation(menuObj) {
      return menuObj.find('li');
    }
    /*
     * Smooth scroll to content
     *
     * @param  {Element} menuObj     - Returns the menu element within the document.
     * @return {Void}
     */


    function goPageSection(menuObj) {
      menuObj.find('li > a').off('click.ONEPAGE').on('click.ONEPAGE', function (e) {
        e.preventDefault();
        if ($(this).parent().hasClass('is-active')) return false;
        moveTo($sectionsContainer, false, $(this).parent('li').index() + 1);
      });
    }

    var navMinTop = $sidefixedMenu.length > 0 ? $sidefixedMenu.offset().top : 0,
        navMaxTop = parseFloat($(document).height() - $('.uix-footer__container').height()) - windowHeight / 3;
    $window.off('scroll.ONEPAGE touchmove.ONEPAGE').on('scroll.ONEPAGE touchmove.ONEPAGE', function () {
      var scrolled = $(this).scrollTop(),
          spyTop = parseFloat(scrolled + topSpacing),
          minTop = $('[data-highlight-section="true"]').first().offset().top,
          maxTop = $('[data-highlight-section="true"]').last().offset().top + $('[data-highlight-section="true"]').last().height();
      $('[data-highlight-section="true"]').each(function () {
        var $block = $(this),
            eleTop = $block.offset().top; // The 1 pixel in order to solve inaccurate value of outerHeight() 
        // in Safari and Firefox browsers.

        if (eleTop < spyTop + 1) {
          // Highlight element when related content
          getAllNavigation($primaryMenu).removeClass('is-active');
          getAllNavigation($sidefixedMenu).removeClass('is-active');
          getRelatedNavigation($block, $primaryMenu, false).addClass('is-active');
          getRelatedNavigation($block, $sidefixedMenu, false).addClass('is-active');
        }
      }); //Cancel the current highlight element
      // The 1 pixel in order to solve inaccurate value of outerHeight() 
      // in Safari and Firefox browsers.

      if (spyTop > maxTop || spyTop < minTop - 1) {
        getAllNavigation($primaryMenu).removeClass('is-active');
        getAllNavigation($sidefixedMenu).removeClass('is-active');
      } //Detecting when user scrolls to bottom of div


      if (spyTop > navMaxTop || spyTop < navMinTop) {
        $sidefixedMenu.removeClass('is-fixed');
      } else {
        $sidefixedMenu.addClass('is-fixed');
      }
    });
    /* 
     ====================================================
     *  Mouse Wheel & Touch Method
     ====================================================
     */

    var startY = 0;

    var onTouchStart = function onTouchStart(e) {
      var touches = e.touches;

      if (touches && touches.length) {
        startY = touches[0].pageY;
      }
    };

    var onDeviceWheel = function onDeviceWheel(e) {
      //Gets a value that indicates the amount that the mouse wheel has changed.
      var dir,
          delta,
          mobileDeltaY = null;
      var touches = e.touches;

      if (touches && touches.length) {
        mobileDeltaY = startY - touches[0].pageY;
      } else {
        delta = Math.max(-1, Math.min(1, -e.deltaY));
      }

      if (mobileDeltaY != null) {
        if (mobileDeltaY >= 50) {
          //--- swipe up
          dir = 'up';
        }

        if (mobileDeltaY <= -50) {
          //--- swipe down
          dir = 'down';
        }
      } else {
        if (delta < 0) {
          //scroll down
          dir = 'down';
        } else {
          //scroll up
          dir = 'up';
        }
      }

      scrollMoveInit(e, dir);
    };

    window.addEventListener('wheel', onDeviceWheel, {
      passive: true
    });
    window.addEventListener('touchstart', onTouchStart, {
      passive: true
    });
    window.addEventListener('touchmove', onDeviceWheel, {
      passive: true
    });
  };

  module.components.documentReady.push(module.ONEPAGE.documentReady);
  return function ONEPAGE() {
    one_page_js_classCallCheck(this, ONEPAGE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/one-page2/js/index.js
function one_page2_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Full Page/One Page Transition 2 -->
 *************************************
 */

/**
 * module.ONEPAGE2
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */

var ONEPAGE2 = function (module, $, window, document) {
  if (window.ONEPAGE2 === null) return false;
  module.ONEPAGE2 = module.ONEPAGE2 || {};
  module.ONEPAGE2.version = '0.0.6';

  module.ONEPAGE2.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //Determine the direction of a jQuery scroll event
    //Fix an issue for mousewheel event is too fast.

    var quietPeriod = 500,
        //Do not change it
    animationTime = 1000,
        //According to page transition animation changes
    $sectionsContainer = $('.uix-normal-load__onepage-container2'),
        $sections = $sectionsContainer.find('[data-highlight-section]'),
        sectionTotal = $sections.length,
        $primaryMenu = $('.uix-menu'),
        $sidefixedMenu = $('.uix-menu-sidefixed');
    var lastAnimation = 0; //Prevent this module from loading in other pages

    if ($sectionsContainer.length == 0) return false; //Init the sections style

    $sectionsContainer.css({
      'position': 'relative'
    });
    var secIndex = 10;

    for (var i = 0; i < sectionTotal; i++) {
      $sections.eq(i).css({
        'position': 'absolute',
        'width': '100%',
        'z-index': secIndex,
        'top': 0,
        'left': 0
      });
      secIndex--;
    } // Prepare everything before binding wheel scroll


    $.each($sections, function (i) {
      $(this).attr('data-index', i);

      if (i == 0) {
        $(this).addClass('is-active');
      }
    }); //Init the section location

    sectionStart(); //Detect URL change

    $(window).on('hashchange', function () {
      var hash = window.location.hash,
          locArr,
          loc;

      if (hash) {
        //Add hashchange event
        locArr = hash.split('section-');
        loc = locArr[1];
        moveTo($sectionsContainer, false, loc);
      }
    });
    /*
     * Init the section location
     *
     * @return {Void}
     */

    function sectionStart() {
      setTimeout(function () {
        var hash = window.location.hash,
            locArr,
            loc,
            curTab;

        if (hash) {
          //Add hashchange event
          locArr = hash.split('section-');
          loc = locArr[1];
          moveTo($sectionsContainer, false, loc);
        } else {
          moveTo($sectionsContainer, false, 1);
        }
      }, quietPeriod);
    }
    /*
     * Initialize the depth of all sections
     *
     * @param  {Number} nextIndex        - Index of next section.
     * @param  {Number} currentIndex     - Index of current section.
     * @return {Void}
     */


    function sectionsDepthInit(nextIndex, currentIndex) {
      var secIndex = 10;

      for (var _i = 0; _i < sectionTotal; _i++) {
        if (nextIndex && _i != nextIndex && _i != currentIndex) {
          $sections.eq(_i).css('z-index', secIndex);
        }

        secIndex--;
      }
    }
    /*
     * Scroll initialize
     *
     * @param  {Event} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
     * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
     * @return {Void}
     */


    function scrollMoveInit(event, dir) {
      var timeNow = new Date().getTime(); // Cancel scroll if currently animating or within quiet period

      if (timeNow - lastAnimation < quietPeriod + animationTime) {
        return;
      }

      if (dir == 'down') {
        //scroll down
        moveTo($sectionsContainer, 'down', false);
      } else {
        //scroll up
        moveTo($sectionsContainer, 'up', false);
      }

      lastAnimation = timeNow;
    }
    /*
     * Move Animation
     *
     * @param  {Element} el           - The container of each sections.
     * @param  {String} dir          - Rolling direction indicator.
     * @param  {Number} hashID       - ID of custom hashchange event.
     * @return {Void}
     */


    function moveTo(el, dir, hashID) {
      var index = parseFloat($sections.filter('.is-active').attr('data-index')),
          isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
      var nextIndex = null,
          $next = null;

      if (dir == 'down' || dir === false) {
        nextIndex = index + 1;
      } else {
        nextIndex = index - 1;
      } //ID of custom hashchange event


      if (isNumeric.test(hashID)) nextIndex = parseFloat(hashID - 1);

      if (nextIndex <= parseFloat(sectionTotal - 1) && nextIndex >= 0) {
        if (nextIndex > parseFloat(sectionTotal - 1)) nextIndex = parseFloat(sectionTotal - 1);
        if (nextIndex < 0) nextIndex = 0; //Returns the target section

        $next = $sections.eq(nextIndex);

        if ($next.length > 0) {
          TweenMax.set($next, {
            css: {
              'z-index': 12,
              'top': dir == 'down' || dir === false ? windowHeight : -windowHeight
            },
            onComplete: function onComplete() {
              //Reset sections z-index
              $sections.eq(index).css('z-index', 11);
              sectionsDepthInit(nextIndex, index);
              TweenMax.to($sections.eq(index), animationTime / 1000, {
                css: {
                  'top': dir == 'down' || dir === false ? -windowHeight / 2 : windowHeight / 2
                },
                ease: Power2.easeOut
              });
              TweenMax.to(this.target, animationTime / 2000, {
                css: {
                  'top': 0
                },
                ease: Power2.easeOut,
                onComplete: function onComplete() {
                  $sections.removeClass('leave');
                  $sections.eq(index).addClass('leave');
                  $sections.removeClass('is-active');
                  $next.addClass('is-active').removeClass('leave'); //Changing The Site URL

                  var curSectionIndex = $sections.filter('.is-active').index() + 1,
                      href = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + $sections.filter('.is-active').attr('id'); // Save state on history stack
                  // - First argument is any object that will let you restore state
                  // - Second argument is a title (not the page title, and not currently used)
                  // - Third argument is the URL - this will appear in the browser address bar

                  history.pushState({}, document.title, href);
                  console.log('Section ' + curSectionIndex + ' loaded!'); // Highlight element when related content

                  getAllNavigation($primaryMenu).removeClass('is-active');
                  getAllNavigation($sidefixedMenu).removeClass('is-active');
                  $primaryMenu.find('li').eq(nextIndex).addClass('is-active');
                  $sidefixedMenu.find('li').eq(nextIndex).addClass('is-active');
                }
              });
            }
          });
        }
      }
    }
    /* 
     ====================================================
     *  Navigation Interaction
     ====================================================
     */


    goPageSection($primaryMenu);
    goPageSection($sidefixedMenu); //Activate the first item

    $primaryMenu.find('li:first').addClass('is-active');
    $sidefixedMenu.find('li:first').addClass('is-active');
    /*
     * Get section or article by href
     *
     * @param  {String|Object} el  - The current selector or selector ID
     * @return {Object}             - A new selector.
     */

    function getRelatedContent(el) {
      return $($(el).attr('href'));
    }
    /*
     * Get all links by section or article
     *
     * @param  {Element} menuObj     - Returns the menu element within the document.
     * @return {Element}             - A new selector.
     */


    function getAllNavigation(menuObj) {
      return menuObj.find('li');
    }
    /*
     * Smooth scroll to content
     *
     * @param  {Element} menuObj     - Returns the menu element within the document.
     * @return {Void}
     */


    function goPageSection(menuObj) {
      menuObj.find('li > a').off('click.ONEPAGE2').on('click.ONEPAGE2', function (e) {
        e.preventDefault();
        if ($(this).parent().hasClass('is-active')) return false;
        var dir = 'down';

        if ($sections.filter('.is-active').index() > $(this).parent().index()) {
          dir = 'up';
        }

        moveTo($sectionsContainer, dir, $(this).parent('li').index() + 1);
      });
    }
    /* 
     ====================================================
     *  Mouse Wheel & Touch Method
     ====================================================
     */


    var startY = 0;

    var onTouchStart = function onTouchStart(e) {
      var touches = e.touches;

      if (touches && touches.length) {
        startY = touches[0].pageY;
      }
    };

    var onDeviceWheel = function onDeviceWheel(e) {
      //Gets a value that indicates the amount that the mouse wheel has changed.
      var dir,
          delta,
          mobileDeltaY = null;
      var touches = e.touches;

      if (touches && touches.length) {
        mobileDeltaY = startY - touches[0].pageY;
      } else {
        delta = Math.max(-1, Math.min(1, -e.deltaY));
      }

      if (mobileDeltaY != null) {
        if (mobileDeltaY >= 50) {
          //--- swipe up
          dir = 'up';
        }

        if (mobileDeltaY <= -50) {
          //--- swipe down
          dir = 'down';
        }
      } else {
        if (delta < 0) {
          //scroll down
          dir = 'down';
        } else {
          //scroll up
          dir = 'up';
        }
      }

      scrollMoveInit(e, dir);
    };

    window.addEventListener('wheel', onDeviceWheel, browser.supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('touchstart', onTouchStart, browser.supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('touchmove', onDeviceWheel, browser.supportsPassive ? {
      passive: true
    } : false);
  };

  module.components.documentReady.push(module.ONEPAGE2.documentReady);
  return function ONEPAGE2() {
    one_page2_js_classCallCheck(this, ONEPAGE2);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/parallax/scss/_style.scss
var parallax_scss_style = __webpack_require__(51);

// CONCATENATED MODULE: ./src/components/ES6/parallax/js/index.js
function parallax_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function parallax_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { parallax_js_typeof = function _typeof(obj) { return typeof obj; }; } else { parallax_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return parallax_js_typeof(obj); }

/* 
 *************************************
 * <!-- Parallax -->
 *************************************
 */



var PARALLAX = function (module, $, window, document) {
  if (window.PARALLAX === null) return false;
  module.PARALLAX = module.PARALLAX || {};
  module.PARALLAX.version = '0.0.6';

  module.PARALLAX.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //  Initialize

    parallaxInit(windowWidth, windowHeight);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight; // Do stuff here

        parallaxInit(windowWidth, windowHeight);
      }
    });
    /*
     * Initialize parallx settings
     *
     * @param  {Number} w         - Returns width of browser viewport
     * @param  {Number} h         - Returns height of browser viewport
     * @return {Void}
     */

    function parallaxInit(w, h) {
      /* Pure parallax scrolling effect without other embedded HTML elements */
      $('.uix-parallax--el').each(function () {
        var $this = $(this);
        var dataSpeed = $this.data('speed'),
            dataEasing = $this.data('transition');

        if (parallax_js_typeof(dataSpeed) === ( true ? "undefined" : undefined)) {
          dataSpeed = 0;
        }

        if (parallax_js_typeof(dataEasing) === ( true ? "undefined" : undefined)) {
          dataEasing = 'none 0s ease 0s';
        }

        $this.UixParallax({
          'speed': dataSpeed,
          'bg': false,
          transition: dataEasing
        });
      });
      /* Parallax scrolling effect with embedded HTML elements */

      $('.uix-parallax').each(function () {
        var $this = $(this);
        var $curImg = $this.find('.uix-parallax__img'),
            dataImg = $curImg.attr('src');
        var dataSkew = $this.data('skew'),
            dataSpeed = $this.data('speed'),
            dataEasing = $this.data('transition'),
            dataOverlay = $this.data('overlay-bg'),
            dataFullyVisible = $this.data('fully-visible'),
            dataXPos = $this.data('xpos'),
            curImgH = null,
            curImgW = null,
            curSize = 'cover';

        if (parallax_js_typeof(dataOverlay) === ( true ? "undefined" : undefined) || dataOverlay == 'none' || dataOverlay == 0 || dataOverlay == false) {
          dataOverlay = 'rgba(0, 0, 0, 0)';
        }

        if (parallax_js_typeof(dataSpeed) === ( true ? "undefined" : undefined)) {
          // If there is no data-xxx, save current source to it
          dataSpeed = 0;
        }

        if (parallax_js_typeof(dataEasing) === ( true ? "undefined" : undefined)) {
          dataEasing = 'none 0s ease 0s';
        }

        if (parallax_js_typeof(dataXPos) === ( true ? "undefined" : undefined)) {
          dataXPos = '50%';
        }

        if (parallax_js_typeof(dataFullyVisible) === ( true ? "undefined" : undefined)) {
          dataFullyVisible = false;
        } //Trigger a callback when the selected images are loaded
        //Check if the picture is loaded on the page


        var img = new Image();

        img.onload = function () {
          curImgH = $curImg.height();
          curImgW = $curImg.width(); //Custom height for parallax container

          if ($this.hasClass('uix-height--10') || $this.hasClass('uix-height--20') || $this.hasClass('uix-height--30') || $this.hasClass('uix-height--40') || $this.hasClass('uix-height--50') || $this.hasClass('uix-height--60') || $this.hasClass('uix-height--70') || $this.hasClass('uix-height--80') || $this.hasClass('uix-height--90') || $this.hasClass('uix-height--100')) {
            var newH = $this.height();
            $this.css({
              'height': newH + 'px'
            });
            $curImg.css('max-height', newH + 'px');
          } else {
            $this.css({
              'height': $this.height() + 'px'
            });
          } //If the ".uix-v-align--absolute" has more content


          if (w <= 768) {
            if ($this.find('.uix-v-align--absolute').height() >= curImgH) {
              $this.find('.uix-v-align--absolute').addClass('uix-v-align--relative');
              $curImg.hide();
            }
          } //Resize the background image to cover the entire container and
          //Resize the background image to make sure the image is fully visible


          if (curImgW > w) {
            curSize = 'contain';
          } else {
            curSize = 'cover';
          } //Determine image height and parallax container height
          //If the height is the same, higher or lower than the height of the container height, 
          //be sure to use the cover attribute
          //*** Must be placed before the "dataFullyVisible" condition


          if (curImgH <= $this.height()) {
            curSize = 'cover';
          } //Whether to display all pictures, including the edges


          if (dataFullyVisible) {
            if (curImgW < w) {
              curSize = 'cover';
            } else {
              curSize = 'contain';
            }
          } //console.log( 'Height: ' +curImgH + '===' + $this.height() + ' | Width: ' + curImgW + '===' + w + ' | ' + curSize );
          //Add background image to parallax container


          if (parallax_js_typeof(dataImg) != ( true ? "undefined" : undefined)) {
            if (Modernizr.cssanimations) {
              // supported
              $this.css({
                'background': 'linear-gradient(' + dataOverlay + ', ' + dataOverlay + '), url(' + dataImg + ') ' + dataXPos + ' 0/' + curSize + ' no-repeat fixed'
              });
            } else {
              // not-supported
              $this.css({
                'background': 'url(' + dataImg + ') ' + dataXPos + ' 0/' + curSize + ' no-repeat fixed'
              });
            }
          } //Apply tilt effect


          if (parallax_js_typeof(dataSkew) != ( true ? "undefined" : undefined) && dataSkew != 0) {
            //Firefox browser will affect parallax effect due to transform
            $this.css({
              'transform': 'skew(0deg, ' + dataSkew + 'deg)'
            });
          } //Use parallax to background


          $this.UixParallax({
            'speed': dataSpeed,
            transition: dataEasing,
            'bg': {
              enable: true,
              xPos: dataXPos
            }
          });
        };

        img.src = dataImg;
      });
    }
  };

  module.components.documentReady.push(module.PARALLAX.documentReady);
  return function PARALLAX() {
    parallax_js_classCallCheck(this, PARALLAX);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/periodical-scroll/scss/_style.scss
var periodical_scroll_scss_style = __webpack_require__(52);

// CONCATENATED MODULE: ./src/components/ES6/periodical-scroll/js/index.js
function periodical_scroll_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function periodical_scroll_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { periodical_scroll_js_typeof = function _typeof(obj) { return typeof obj; }; } else { periodical_scroll_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return periodical_scroll_js_typeof(obj); }

/* 
 *************************************
 * <!-- Periodical Scroll -->
 *************************************
 */


var PERIODICAL_SCROLL = function (module, $, window, document) {
  if (window.PERIODICAL_SCROLL === null) return false;
  module.PERIODICAL_SCROLL = module.PERIODICAL_SCROLL || {};
  module.PERIODICAL_SCROLL.version = '0.0.2';

  module.PERIODICAL_SCROLL.documentReady = function ($) {
    $('[data-periodical-scroll-container]').each(function () {
      var $this = $(this);
      var ul = $this.data('periodical-scroll-container'),
          speed = $this.data('periodical-scroll-speed'),
          timing = $this.data('periodical-scroll-timing'),
          $wrap = $this.find(ul),
          itemHeight = $wrap.find('li:first').height();

      if (periodical_scroll_js_typeof(speed) === ( true ? "undefined" : undefined)) {
        speed = 600;
      }

      if (periodical_scroll_js_typeof(timing) === ( true ? "undefined" : undefined)) {
        timing = 2000;
      }

      var $item = $wrap.find('> li'),
          moveY = itemHeight * 2,
          timeline = new TimelineMax({
        onComplete: function onComplete() {
          setTimeout(function () {
            timeline.restart();
          }, timing);
        }
      });
      TweenLite.defaultEase = Circ.easeInOut;
      timeline.add(TweenMax.staggerFromTo($item, speed / 1000, {
        opacity: 0,
        y: moveY
      }, {
        opacity: 1,
        y: 0
      }, timing / 1000)).add(TweenMax.staggerTo($item, speed / 1000, {
        delay: timing / 1000,
        opacity: 0,
        y: -moveY
      }, timing / 1000), 0);
      $wrap.on('mouseenter', function () {
        timeline.pause();
      }).on('mouseleave', function () {
        timeline.play();
      });
    });
  };

  module.components.documentReady.push(module.PERIODICAL_SCROLL.documentReady);
  return function PERIODICAL_SCROLL() {
    periodical_scroll_js_classCallCheck(this, PERIODICAL_SCROLL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/pricing/scss/_style.scss
var pricing_scss_style = __webpack_require__(53);

// CONCATENATED MODULE: ./src/components/ES6/pricing/js/index.js
function pricing_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Pricing -->
 *************************************
 */


var PRICING = function (module, $, window, document) {
  if (window.PRICING === null) return false;
  module.PRICING = module.PRICING || {};
  module.PRICING.version = '0.0.2';

  module.PRICING.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight; //-------- Pricing initialize

    pricingInit(windowWidth);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth; // Do stuff here

        pricingInit(windowWidth);
      }
    });

    function pricingInit(w) {
      //Initialize the height
      $('.uix-price').each(function () {
        //returns new id
        var $this = $(this);
        var $initHeight = $this.find('.js-uix-init-height');
        var priceBGH = [],
            priceBGH_excerpt = [];
        $initHeight.each(function (index) {
          //Screen protection of height
          $(this).find('.uix-price__outline, .uix-price__excerpt').css('height', 'auto');
          var tempheight = $(this).height();
          var tempheight_excerpt = $(this).find('.uix-price__excerpt').height();
          priceBGH.push(tempheight);
          priceBGH_excerpt.push(tempheight_excerpt);
        });
        var priceBGH_Max = Math.max.apply(Math, priceBGH);

        if (priceBGH_Max > 0) {
          if (w > 768) {
            // Initialize the height of all columns
            $initHeight.find('.uix-price__outline').css('height', priceBGH_Max + 'px'); // Actived columns

            $initHeight.find('.uix-price__outline.is-active').each(function () {
              var ty = Math.abs(parseInt($(this).css('transform').split(',')[5]));

              if (!isNaN(ty)) {
                $(this).css('height', priceBGH_Max + ty * 2 + 'px');
              }
            });
          } else {
            $initHeight.find('.uix-price__outline').css('height', 'auto');
          } // Actived columns


          $initHeight.find('.uix-price__outline.is-active').each(function () {
            var textColor = $(this).closest('.uix-price__outline--hover').data('tcolor'),
                btnColor = $(this).closest('.uix-price__outline--hover').data('bcolor');
            $(this).css('background-color', btnColor);
            $(this).find('.uix-btn').removeClass('uix-btn__bg--primary').addClass('uix-btn__bg--secondary');
          });
        }
      });
    }
  };

  module.components.documentReady.push(module.PRICING.documentReady);
  return function PRICING() {
    pricing_js_classCallCheck(this, PRICING);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/progress-bar/scss/_style.scss
var progress_bar_scss_style = __webpack_require__(54);

// CONCATENATED MODULE: ./src/components/ES6/progress-bar/js/index.js
function progress_bar_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function progress_bar_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { progress_bar_js_typeof = function _typeof(obj) { return typeof obj; }; } else { progress_bar_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return progress_bar_js_typeof(obj); }

/* 
 *************************************
 * <!-- Progress Bar -->
 *************************************
 */


var PROGRESS_BAR = function (module, $, window, document) {
  if (window.PROGRESS_BAR === null) return false;
  module.PROGRESS_BAR = module.PROGRESS_BAR || {};
  module.PROGRESS_BAR.version = '0.0.6';

  module.PROGRESS_BAR.documentReady = function ($) {
    var $scrollElements = $('[data-progressbar-percent]');
    $(window).off('scroll.PROGRESS_BAR touchmove.PROGRESS_BAR');
    $scrollElements.each(function () {
      var viewport = 1;
      var $el = $(this); //

      var scrollUpdate = function scrollUpdate() {
        var spyTop = $el[0].getBoundingClientRect().top; //Prevent asynchronous loading of repeated calls

        var actived = $el.data('activated');

        if (spyTop < window.innerHeight * viewport) {
          if (progress_bar_js_typeof(actived) === ( true ? "undefined" : undefined)) {
            var percent = $el.data('progressbar-percent'),
                unit = $el.data('progressbar-unit');

            if (progress_bar_js_typeof(percent) === ( true ? "undefined" : undefined)) {
              percent = 0;
            }

            if (progress_bar_js_typeof(unit) === ( true ? "undefined" : undefined)) {
              unit = '%';
            } //Radial Progress Bar


            if ($el.hasClass('uix-progressbar--circle')) {
              $el.find('.uix-progressbar__track').html('<span>' + percent + '<em class="uix-progressbar__unit">' + unit + '</em></span>');
              $el.addClass('uix-progressbar--progress-' + percent);
            } //Rectangle Progress Bar


            if ($el.hasClass('uix-progressbar--rectangle')) {
              $el.find('.uix-progressbar__bar > span').html('' + percent + '<em class="uix-progressbar__unit">' + unit + '</em>');
              $el.addClass('uix-progressbar--progress-' + percent);
            } //Prevents front-end javascripts that are activated in the background to repeat loading.


            $el.data('activated', 1);
          } //endif actived

        }
      };

      scrollUpdate(); // Please do not use scroll's off method in each

      $(window).on('scroll.PROGRESS_BAR touchmove.PROGRESS_BAR', function (event) {
        scrollUpdate();
      });
    }); //end each        
  };

  module.components.documentReady.push(module.PROGRESS_BAR.documentReady);
  return function PROGRESS_BAR() {
    progress_bar_js_classCallCheck(this, PROGRESS_BAR);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/progress-line/scss/_style.scss
var progress_line_scss_style = __webpack_require__(55);

// CONCATENATED MODULE: ./src/components/ES6/progress-line/js/index.js
function progress_line_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Progress Line -->
 *************************************
 */


var PROGRESS_LINE = function (module, $, window, document) {
  if (window.PROGRESS_LINE === null) return false;
  module.PROGRESS_LINE = module.PROGRESS_LINE || {};
  module.PROGRESS_LINE.version = '0.0.3';

  module.PROGRESS_LINE.documentReady = function ($) {
    var $obj = $('.uix-progress-line'),
        $progressLineCircle = $obj.find('.uix-progress-line__circle'),
        progressLineRestore = function progressLineRestore() {
      var k = 0;
      var progressLineAnimGo = setInterval(function () {
        $progressLineCircle.eq(k).addClass('is-active');
        $progressLineCircle.eq(k).next('.uix-progress-line__bar').addClass('is-active');
        k++;

        if (k == 10) {
          clearInterval(progressLineAnimGo);
        }
      }, 50);
    }; //


    $progressLineCircle.on('mouseenter', function () {
      var curIndex = $(this).index() / 2;
      $progressLineCircle.removeClass('is-active');
      $progressLineCircle.next('.uix-progress-line__bar').removeClass('is-active');

      for (var i = curIndex; i >= 0; i--) {
        $progressLineCircle.eq(i).addClass('is-active');
        $progressLineCircle.eq(i).next('.uix-progress-line__bar').addClass('is-active');
      }
    });
    $progressLineCircle.parent().on('mouseleave', function () {
      progressLineRestore();
    }); //Adapt line width for different resolution
    //		const plLength     = $progressLineCircle.length,
    //			  newPlW       = $obj.find( '.uix-progress-line__circle' ).first().width(),
    //			  plWrapperW   = $obj.width();
    //
    //		$obj.find( '.uix-progress-line__bar' ).css( 'width', parseFloat( plWrapperW - newPlW*plLength )/(plLength-1) + 'px' );
    //		
  };

  module.components.documentReady.push(module.PROGRESS_LINE.documentReady);
  return function PROGRESS_LINE() {
    progress_line_js_classCallCheck(this, PROGRESS_LINE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/retina/js/index.js
function retina_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Retina Graphics for Website -->
 *************************************
 */

var RETINA = function (module, $, window, document) {
  if (window.RETINA === null) return false;
  module.RETINA = module.RETINA || {};
  module.RETINA.version = '0.0.1';

  module.RETINA.documentReady = function ($) {
    //Determine if you have retinal display
    var hasRetina = false,
        rootRetina = typeof exports === 'undefined' ? window : exports,
        mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

    if (rootRetina.devicePixelRatio > 1 || rootRetina.matchMedia && rootRetina.matchMedia(mediaQuery).matches) {
      hasRetina = true;
    }

    if (hasRetina) {
      //do something
      $('[data-retina]').each(function () {
        $(this).attr({
          'src': $(this).data('retina')
        });
      });
    }
  };

  module.components.documentReady.push(module.RETINA.documentReady);
  return function RETINA() {
    retina_js_classCallCheck(this, RETINA);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/rotating-elements/js/index.js
function rotating_elements_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function rotating_elements_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { rotating_elements_js_typeof = function _typeof(obj) { return typeof obj; }; } else { rotating_elements_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return rotating_elements_js_typeof(obj); }

/* 
 *************************************
 * <!-- Rotating Elements -->
 *************************************
 */

var ROTATING_EL = function (module, $, window, document) {
  if (window.ROTATING_EL === null) return false;
  module.ROTATING_EL = module.ROTATING_EL || {};
  module.ROTATING_EL.version = '0.0.2';

  module.ROTATING_EL.documentReady = function ($) {
    $('[data-pointer-to-deg]').each(function () {
      var $this = $(this);
      var config = $this.data('pointer-to-deg');

      if (rotating_elements_js_typeof(config) === ( true ? "undefined" : undefined)) {
        config = false;
      }

      if (config) {
        if ($(config.target).length == 0) return false;
        var pointer = $(config.target)[0],
            pointerBox = pointer.getBoundingClientRect(),
            centerPoint = window.getComputedStyle(pointer).transformOrigin,
            centers = centerPoint.split(' ');
        var mouseX, mouseY;

        if (config.mouseSpy) {
          $(document).on('mousemove touchstart touchmove', function (e) {
            var pointerEvent = e;

            if (e.targetTouches && e.targetTouches[0]) {
              e.preventDefault();
              pointerEvent = e.targetTouches[0];
              mouseX = pointerEvent.pageX;
              mouseY = pointerEvent.pageY;
            } else {
              mouseX = e.clientX;
              mouseY = e.clientY;
            }

            var centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
                centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
                radians = Math.atan2(mouseX - centerX, mouseY - centerY),
                degrees = radians * (180 / Math.PI) * -1 + 180;
            pointer.style.transform = 'rotate(' + degrees + 'deg)';
          });
        }

        $this.off('click').on('click', function (e) {
          e.preventDefault();
          pointer.style.transform = 'rotate(' + config.deg + 'deg)';
        });
      }
    });
  };

  module.components.documentReady.push(module.ROTATING_EL.documentReady);
  return function ROTATING_EL() {
    rotating_elements_js_classCallCheck(this, ROTATING_EL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/scroll-reveal/js/index.js
function scroll_reveal_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scroll_reveal_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { scroll_reveal_js_typeof = function _typeof(obj) { return typeof obj; }; } else { scroll_reveal_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return scroll_reveal_js_typeof(obj); }

/* 
 *************************************
 * <!-- Scroll Reveal -->
 *************************************
 */

var SCROLL_REVEAL = function (module, $, window, document) {
  if (window.SCROLL_REVEAL === null) return false;
  module.SCROLL_REVEAL = module.SCROLL_REVEAL || {};
  module.SCROLL_REVEAL.version = '0.1.4';

  module.SCROLL_REVEAL.documentReady = function ($) {
    //From JSON config in data attribute in HTML
    var $scrollElements = $('[data-uix-anim]');
    $(window).off('scroll.SCROLL_REVEAL touchmove.SCROLL_REVEAL');
    $scrollElements.each(function () {
      var viewport;
      var $el = $(this);
      var tl = new TimelineMax({
        paused: true
      }); //

      var config = $el.data('uix-anim');

      if (scroll_reveal_js_typeof(config) === ( true ? "undefined" : undefined) || config == '' || config === false) {
        config = {
          "from": {
            "opacity": 0,
            "x": 70
          },
          "to": {
            "opacity": 1,
            "x": 0
          },
          "ease": "Power2.easeOut",
          "duration": 0.4,
          "delay": 0,
          "infinite": false,
          "viewport": '100%' //A percentage of the viewport's height.

        };
      } //get attributes to tweenMax


      var fromCSS = config.from,
          toCSS = config.to,
          myEase = config.ease,
          myDuration = config.duration,
          myDelay = config.delay,
          infinite = config.infinite; //A percentage of the viewport's height.

      viewport = config.viewport;
      if (scroll_reveal_js_typeof(viewport) === ( true ? "undefined" : undefined)) viewport = '100%';
      if (scroll_reveal_js_typeof(myEase) === ( true ? "undefined" : undefined)) myEase = 'Power2.easeOut';
      if (scroll_reveal_js_typeof(myDelay) === ( true ? "undefined" : undefined)) myDelay = 0;
      if (scroll_reveal_js_typeof(myDuration) === ( true ? "undefined" : undefined)) myDuration = 0.4;
      if (scroll_reveal_js_typeof(infinite) === ( true ? "undefined" : undefined)) infinite = false; //Conversion between percentage and decimal

      viewport = parseFloat(viewport) / 100.0; //Make it go back and forth

      var reverse = infinite ? 1 : 0; //Set the initial state of the element

      TweenMax.set($el, {
        css: fromCSS
      }); //

      var fromIsString = Object.prototype.toString.call(fromCSS) == '[object String]' ? true : false;

      if (fromIsString) {
        toCSS = toCSS.replace(/\./, '');
      } else {
        tl.to($el, myDuration, {
          css: toCSS,
          ease: myEase,
          delay: myDelay
        });
        $el[0].animation = tl;
      } //


      var scrollUpdate = function scrollUpdate() {
        var spyTop = $el[0].getBoundingClientRect().top; //Prevent asynchronous loading of repeated calls

        var actived = $el.data('activated');

        if (spyTop < window.innerHeight * viewport) {
          if (scroll_reveal_js_typeof(actived) === ( true ? "undefined" : undefined)) {
            if (fromIsString) {
              //Add class when element becomes visible
              $el.delay(myDelay * 1000).queue('fx', function () {
                $(this).addClass(toCSS).dequeue();
              });
            } else {
              $el[0].animation.play();
            } //Prevents front-end javascripts that are activated in the background to repeat loading.


            $el.data('activated', 1);
          } //endif actived

        } else {
          if (scroll_reveal_js_typeof(actived) !== ( true ? "undefined" : undefined) && reverse === 1) {
            if (fromIsString) {
              //Add class when element becomes visible
              $el.removeClass(toCSS);
            } else {
              $el[0].animation.reverse();
            }

            $el.removeData('activated');
          } //endif actived

        }
      };

      scrollUpdate(); // Please do not use scroll's off method in each

      $(window).on('scroll.SCROLL_REVEAL touchmove.SCROLL_REVEAL', function (event) {
        scrollUpdate();
      });
    }); //end each        
  };

  module.components.documentReady.push(module.SCROLL_REVEAL.documentReady);
  return function SCROLL_REVEAL() {
    scroll_reveal_js_classCallCheck(this, SCROLL_REVEAL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/scrollspy-animate/js/index.js
function scrollspy_animate_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Scrollspy Animate -->
 *************************************
 */

/**
 * module.SCROLLSPY_ANIM
 * 
 * @requires ./examples/assets/js/min/pixi.min.js
 * @requires ./src/components/ES5/_plugins-GSAP
 */

var SCROLLSPY_ANIM = function (module, $, window, document) {
  if (window.SCROLLSPY_ANIM === null) return false;
  module.SCROLLSPY_ANIM = module.SCROLLSPY_ANIM || {};
  module.SCROLLSPY_ANIM.version = '0.0.6';

  module.SCROLLSPY_ANIM.documentReady = function ($) {
    // Remove pixi.js banner from the console
    PIXI.utils.skipHello();
    var $el = $('#scrollspy-animate-demo'),
        panelHeight = 0; //Prevent this module from loading in other pages

    if ($el.length == 0) return false;
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var curSprite;
    var filterSprite; //-------- Text Affect

    if (Modernizr.webgl) {
      var $txtContainer = $el.find('.row canvas'),
          text = $txtContainer.data('txt').split(''),
          tHeight = 45,
          tWidth = 25,
          renderer = new PIXI.Application({
        width: tWidth * (text.length + 2),
        height: tHeight * 2,
        antialias: true,
        transparent: true,
        resolution: 1,
        autoResize: 1,
        view: document.getElementById('scrollspy-animate-demo--txt')
      });
      var stage = new PIXI.Container();
      filterSprite = PIXI.Sprite.from($txtContainer.data('filter-texture'));
      filterSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      var filter = new PIXI.filters.DisplacementFilter(filterSprite);
      var txtStyle = new PIXI.TextStyle({
        fontSize: tHeight,
        letterSpacing: 0,
        breakWords: true,
        dropShadow: true,
        dropShadowAngle: Math.PI / 6,
        dropShadowAlpha: 0.5,
        dropShadowColor: '#333',
        dropShadowBlur: 1,
        fill: 'white',
        fontFamily: 'Arial Black',
        fontStyle: 'normal',
        fontWeight: 'bold',
        wordWrap: false,
        align: 'left'
      });
      curSprite = new PIXI.Text($txtContainer.data('txt'), txtStyle);
      curSprite.x = 0;
      curSprite.y = 0;
      renderer.stage.addChild(curSprite);
      curSprite.anchor.set(0);
      curSprite.scale.set(1);
      filterSprite.anchor.set(0);
      filterSprite.scale.set(0.3);
      filterSprite.x = -50;
      filterSprite.y = 0;
      renderer.stage.filterArea = renderer.screen;
      renderer.stage.addChild(curSprite, filterSprite);
      renderer.stage.filters = [filter];
      var ticker = new PIXI.Ticker();
      ticker.autoStart = true;
      ticker.add(function (delta) {
        filterSprite.y += 0.2 * delta; // Render updated scene

        renderer.render(stage);
      });
    }

    $window.off('scroll.SCROLLSPY_ANIM touchmove.SCROLLSPY_ANIM').on('scroll.SCROLLSPY_ANIM touchmove.SCROLLSPY_ANIM', function (event) {
      var elHeight = $el.height(),
          elOffsetTop = $el.offset().top - panelHeight;
      var scrolled = $(this).scrollTop(),
          translateTitle = scrolled / 2,
          translateBackground = scrolled / 3,
          scale = scrolled / elHeight,
          backgroundScale = 1,
          // + scale / 10
      titleScale = 1 - scale * 0.1,
          titleOpacity = 1 - scale,
          scrollProgress = (scrolled - elOffsetTop) / (elHeight - windowHeight / 6); //-------- Animation

      var spyTop = $el[0].getBoundingClientRect().top;

      if (spyTop < window.innerHeight) {
        $el.find('.row').css({
          'transition': 'none',
          'transform': 'translateY(' + translateTitle + 'px) scale(' + titleScale + ')',
          'opacity': titleOpacity
        });
        $('body').removeClass('js-uix-content-part').removeClass('js-uix-bottom-part');
      } else {
        $('body').addClass('js-uix-content-part').removeClass('js-uix-bottom-part');
      } //-------- Display progress


      $el.find('.row h3 em').text(scrollProgress.toFixed(2));

      if (Modernizr.webgl) {
        TweenMax.set(filterSprite, {
          x: windowHeight * scrollProgress
        });
      }
    });
  };

  module.components.documentReady.push(module.SCROLLSPY_ANIM.documentReady);
  return function SCROLLSPY_ANIM() {
    scrollspy_animate_js_classCallCheck(this, SCROLLSPY_ANIM);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/show-more-less/scss/_style.scss
var show_more_less_scss_style = __webpack_require__(56);

// CONCATENATED MODULE: ./src/components/ES6/show-more-less/js/index.js
function show_more_less_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Show More Less -->
 *************************************
 */


var SHOW_MORELESS = function (module, $, window, document) {
  if (window.SHOW_MORELESS === null) return false;
  module.SHOW_MORELESS = module.SHOW_MORELESS || {};
  module.SHOW_MORELESS.version = '0.0.3';

  module.SHOW_MORELESS.documentReady = function ($) {
    $('.uix-more-btn__link').each(function () {
      var $btn = $(this),
          $con = $btn.parent().prev('.uix-more-btn'),
          $btnTxt = $btn.find('> span'),
          defaultHeight = $con.height();
      $btn.off('click').on('click', function (e) {
        e.preventDefault();
        var expanded = $(this).attr('aria-expanded') == 'true' ? false : true;

        if (expanded) {
          $con.addClass('is-active').attr('aria-expanded', true);
          $(this).addClass('is-active').attr('aria-expanded', true); //to open
          // - temporarilty set height:auto
          // - tween from height:0

          TweenMax.set($con, {
            height: 'auto'
          });
          TweenMax.from($con, 0.5, {
            height: defaultHeight
          }); //change text

          $btnTxt.eq(0).hide();
          $btnTxt.eq(1).show();
        } else {
          $con.removeClass('is-active').attr('aria-expanded', false);
          $(this).removeClass('is-active').attr('aria-expanded', false); //to close

          TweenMax.to($con, 0.5, {
            height: defaultHeight
          }); //change text

          $btnTxt.eq(0).show();
          $btnTxt.eq(1).hide();
        }
      });
    });
  };

  module.components.documentReady.push(module.SHOW_MORELESS.documentReady);
  return function SHOW_MORELESS() {
    show_more_less_js_classCallCheck(this, SHOW_MORELESS);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/skew-on-scroll/js/index.js
function skew_on_scroll_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Skew Based On Velocity of Scroll -->
 *************************************
 */

var SKEW_ON_SCROLL = function (module, $, window, document) {
  if (window.SKEW_ON_SCROLL === null) return false;
  module.SKEW_ON_SCROLL = module.SKEW_ON_SCROLL || {};
  module.SKEW_ON_SCROLL.version = '0.0.1';

  module.SKEW_ON_SCROLL.documentReady = function ($) {
    $('.uix-skewscroll-container').each(function () {
      var $this = $(this),
          $animObj = $this.find('p'),
          ease = 0.15;
      var followY = 0;
      TweenMax.set($animObj, {
        transformOrigin: "center left"
      });
      TweenMax.ticker.addEventListener('tick', function () {
        followY += (window.scrollY - followY) * ease;
        var dy = (window.scrollY - followY) / 20;
        dy = Math.min(Math.max(dy, -15), 15);
        TweenLite.set($animObj, {
          skewY: dy
        });
      });
    });
  };

  module.components.documentReady.push(module.SKEW_ON_SCROLL.documentReady);
  return function SKEW_ON_SCROLL() {
    skew_on_scroll_js_classCallCheck(this, SKEW_ON_SCROLL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/smooth-scrolling-anchor-link/js/index.js
function smooth_scrolling_anchor_link_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Smooth Scrolling When Clicking An Anchor Link -->
 *************************************
 */

var SMOOTH_SCROLLING_ANCHORLINK = function (module, $, window, document) {
  if (window.SMOOTH_SCROLLING_ANCHORLINK === null) return false;
  module.SMOOTH_SCROLLING_ANCHORLINK = module.SMOOTH_SCROLLING_ANCHORLINK || {};
  module.SMOOTH_SCROLLING_ANCHORLINK.version = '0.0.7';

  module.SMOOTH_SCROLLING_ANCHORLINK.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('body').hasClass('onepage')) return false;
    var browserURL = window.location.href; //Prevent anchor behaviour
    //Do not add off() to this

    $('a').on('click', function (e) {
      if ($(this).data('smooth-scrolling') != false) {
        var linkURL = $(this).attr('href'),
            locIndex,
            locURL;

        if (linkURL.indexOf('#') >= 0 && linkURL != '#') {
          e.preventDefault();
          var locArr = linkURL.split('#');
          locIndex = locArr[1];
          locURL = locArr[0];

          if (browserURL.indexOf(locURL) < 0) {
            window.location.href = locURL + '#!!' + locIndex;
          }
        }
      }
    }); //Page automatically slide to jump to the corresponding position

    if (browserURL.indexOf('#!!') >= 0) {
      var curndex = browserURL.split('#!!'),
          $target = $('#' + curndex[1]); //Smooth scrolling

      if ($target.length) {
        TweenMax.to(window, 0.5, {
          scrollTo: {
            y: $target.offset().top,
            autoKill: false
          },
          ease: Power2.easeOut,
          onComplete: function onComplete() {
            //Fixed an error that offset().top returns wrong value
            var spyTop = $target[0].getBoundingClientRect().top;

            if (spyTop < 0 || spyTop > 30) {
              $('a[href*="#' + curndex[1] + '"]').trigger('click');
            }
          }
        });
      }
    } //Hyperlink click event
    //Do not add off() to this


    $('a[href*="#"]').on('click', function (e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && $(this).attr('href') != '#' & $(this).attr('href').indexOf('#?') < 0) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']'); // Does a scroll target exist?

        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          e.preventDefault();
          TweenMax.to(window, 0.5, {
            scrollTo: {
              y: target.offset().top,
              autoKill: false
            },
            ease: Power2.easeOut,
            onComplete: function onComplete() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();

              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable

                $target.focus();
              }
            }
          });
        }
      }
    });
  };

  module.components.documentReady.push(module.SMOOTH_SCROLLING_ANCHORLINK.documentReady);
  return function SMOOTH_SCROLLING_ANCHORLINK() {
    smooth_scrolling_anchor_link_js_classCallCheck(this, SMOOTH_SCROLLING_ANCHORLINK);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/smooth-scrolling-page/js/index.js
function smooth_scrolling_page_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Smooth Scrolling Page -->
 *************************************
 */

var SMOOTH_SCROLLING_PAGE = function (module, $, window, document) {
  if (window.SMOOTH_SCROLLING_PAGE === null) return false;
  module.SMOOTH_SCROLLING_PAGE = module.SMOOTH_SCROLLING_PAGE || {};
  module.SMOOTH_SCROLLING_PAGE.version = '0.0.9';

  module.SMOOTH_SCROLLING_PAGE.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if (!$('body').hasClass('smooth-scrolling-page')) return false;
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var html = document.documentElement,
        body = document.body,
        scroller = {
      target: '#uix-scrollspy-area',
      ease: 0.05,
      // <= scroll speed
      endY: 0,
      y: 0,
      resizeRequest: 1,
      scrollRequest: 0
    };
    var requestId = null;
    TweenMax.set(scroller.target, {
      rotation: 0.01,
      force3D: true
    }); //Increase the viewport to display the visual area

    var elTop = $(scroller.target).offset().top;
    var initSmoothScrollingPageWrapper = 'js-uix-smooth-scrolling-page-wrapper';

    if (!$('body').hasClass(initSmoothScrollingPageWrapper)) {
      $('body').addClass(initSmoothScrollingPageWrapper);
      $(scroller.target).wrap('<div id="uix-scrollspy-area__wrapper" style="overflow:hidden;position:fixed;height:100%;width:100%;top:0;left:0;right:0;bottom:0;"></div>').css('margin-top', elTop + 'px');
    }

    $(window).on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth; // Do stuff here

        scroller.resizeRequest++;

        if (!requestId) {
          requestId = requestAnimationFrame(scrollUpdate);
        }
      }
    });
    $(window).off('scroll.SMOOTH_SCROLLING_PAGE touchmove.SMOOTH_SCROLLING_PAGE').on('scroll.SMOOTH_SCROLLING_PAGE touchmove.SMOOTH_SCROLLING_PAGE', function () {
      scroller.scrollRequest++;

      if (!requestId) {
        requestId = requestAnimationFrame(scrollUpdate);
      }
    });
    scrollUpdate();

    function scrollUpdate() {
      var resized = scroller.resizeRequest > 0;

      if (resized) {
        var height = $(scroller.target).height();
        body.style.height = parseFloat(height + elTop) + "px";
        scroller.resizeRequest = 0;
      }

      var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
      scroller.endY = scrollY;
      scroller.y += (scrollY - scroller.y) * scroller.ease;

      if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
        scroller.y = scrollY;
        scroller.scrollRequest = 0;
      }

      TweenMax.set(scroller.target, {
        y: -scroller.y,
        onComplete: function onComplete() {//-----Spy scrollTop and elements of page
          //your code here...
        }
      });
      requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(scrollUpdate) : null; //+++++++++++++++++++++++++++++++++++++++++++++++++
      // Custom Functions
      //+++++++++++++++++++++++++++++++++++++++++++++++++

      var scrolled = scroller.y,
          topSpacing = window.innerWidth <= 768 ? 0 : $('.uix-header__container').outerHeight(true); //with margin 
      //----------------------------------------------------------------------------------
      //--------------------------------- Scrollspy Animate -------------------------------	
      //----------------------------------------------------------------------------------   

      var $targetEl = $('#uix-scrollspy-animate');

      if ($targetEl.length > 0) {
        var elHeight = $targetEl.height(),
            elOffsetTop = $targetEl.offset().top - topSpacing;
        var scale = scrolled / elHeight,
            elScale = 1 - scale * 0.1,
            elOpacity = 1 - scale,
            scrollProgress = (scrolled - elOffsetTop) / (elHeight - windowHeight / 6); // Transparency changes when scrolling
        //-------------------------------------	

        console.log('scrolled: ' + scrolled + ' | scrollProgress: ' + scrollProgress + ' | elOpacity: ' + elOpacity + ' | elScale: ' + elScale);
      } //endif $targetEl
      //----------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------	
      //----------------------------------------------------------------------------------  

    } //end scrollUpdate()

  };

  module.components.documentReady.push(module.SMOOTH_SCROLLING_PAGE.documentReady);
  return function SMOOTH_SCROLLING_PAGE() {
    smooth_scrolling_page_js_classCallCheck(this, SMOOTH_SCROLLING_PAGE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/sticky-elements/scss/_style.scss
var sticky_elements_scss_style = __webpack_require__(57);

// CONCATENATED MODULE: ./src/components/ES6/sticky-elements/js/index.js
function sticky_elements_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sticky_elements_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { sticky_elements_js_typeof = function _typeof(obj) { return typeof obj; }; } else { sticky_elements_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return sticky_elements_js_typeof(obj); }

/* 
 *************************************
 *  <!-- Sticky Elements -->
 *************************************
 */


var STICKY_EL = function (module, $, window, document) {
  if (window.STICKY_EL === null) return false;
  module.STICKY_EL = module.STICKY_EL || {};
  module.STICKY_EL.version = '0.0.7';

  module.STICKY_EL.pageLoaded = function () {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var topSpacing = windowWidth <= 768 ? 0 : $('.uix-header__container').outerHeight(true); //with margin
    //prepend a placeholder

    $('.js-uix-sticky-el').each(function () {
      var $el = $(this),
          elHeight = $el.outerHeight(true),
          //with margin
      elClass = $el.attr('class').replace('js-uix-sticky-el', ''),
          tempID = 'sticky-' + UixGUID.create();
      $el.attr('data-sticky-id', tempID);

      if (!$el.hasClass('is-placeholder')) {
        $('<div class="' + elClass + ' is-placeholder"></div>').css({
          'height': elHeight + 'px',
          'width': '100%',
          'display': 'none',
          'visibility': 'hidden'
        }).attr('data-sticky-id', tempID).insertBefore($el);
      }
    }); //  Initialize

    stickyInit(windowWidth, windowHeight);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight; // Do stuff here

        stickyInit(windowWidth, windowHeight);
      }
    });
    /*
     * Initialize Sticky Elements settings
     *
     * @param  {Number} w         - Returns width of browser viewport
     * @param  {Number} h         - Returns height of browser viewport
     * @return {Void}
     */

    function stickyInit(w, h) {
      if (w > 768) {
        $(window).off('scroll.STICKY_EL touchmove.STICKY_EL');
        $('.js-uix-sticky-el').each(function () {
          var $el = $(this),
              elTop = $el.offset().top,
              oWidth = $el.width(),
              clsID = $el.data('sticky-id'),
              $ph = $('[data-sticky-id="' + clsID + '"].is-placeholder'); // Please do not use scroll's off method in each

          $window.on('scroll.STICKY_EL touchmove.STICKY_EL', function () {
            var scrolled = $(this).scrollTop(),
                spyTop = parseFloat(scrolled + window.innerHeight); //------

            if (parseFloat(scrolled + topSpacing) > elTop) {
              $el.addClass('is-active').css({
                'width': oWidth + 'px',
                'top': topSpacing + 'px'
              });
              $ph.css('display', 'block');
            } else {
              $el.removeClass('is-active').css({
                'top': 0
              });
              $ph.css('display', 'none');
            } //------


            if (sticky_elements_js_typeof($el.data('stop-trigger')) != ( true ? "undefined" : undefined) && $($el.data('stop-trigger')).length > 0) {
              var diff = sticky_elements_js_typeof($el.data('stop-trigger-diff')) != ( true ? "undefined" : undefined) && $el.data('stop-trigger-diff').length > 0 ? UixMath.evaluate($el.data('stop-trigger-diff').replace(/\s/g, '').replace(/\%\h/g, windowHeight).replace(/\%\w/g, windowWidth)) : 0,
                  targetTop = $($el.data('stop-trigger')).offset().top - diff; //Detecting when user scrolls to bottom of div

              if (spyTop >= targetTop) {
                $el.css({
                  'top': parseFloat(topSpacing - (spyTop - targetTop)) + 'px'
                });
              } else {
                if ($el.length > 0 && $el.position().top < topSpacing) {
                  $el.css({
                    'top': topSpacing + 'px'
                  });
                }
              }
            }
          }); //endif scroll.STICKY_EL touchmove.STICKY_EL
        }); //endif $( '.js-uix-sticky-el' )
      } else {
        $('.js-uix-sticky-el').removeClass('is-active');
        $('[data-sticky-id].is-placeholder').css('display', 'none');
      } // endif w > 768

    }
  };

  module.components.pageLoaded.push(module.STICKY_EL.pageLoaded);
  return function STICKY_EL() {
    sticky_elements_js_classCallCheck(this, STICKY_EL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/svg-map/scss/_style.scss
var svg_map_scss_style = __webpack_require__(2);

// CONCATENATED MODULE: ./src/components/ES6/svg-map/js/china.js
function china_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- SVG Map (China) -->
 *************************************
 */


var SVG_MAP_CHINA = function (module, $, window, document) {
  if (window.SVG_MAP_CHINA === null) return false;
  module.SVG_MAP_CHINA = module.SVG_MAP_CHINA || {};
  module.SVG_MAP_CHINA.version = '0.0.2';

  module.SVG_MAP_CHINA.documentReady = function ($) {
    var $svgEl = $('.uix-svgmap--china');
    $(document).off('click.SVG_MAP_CHINA').on('click.SVG_MAP_CHINA', '.uix-svgmap--china__trigger a', function (e) {
      // stop propagation of this event, it will never reach body in bubbling phase.
      e.stopPropagation();
      var goName = $(this).data('title'),
          goText = $(this).text();
      var svgCurName = '',
          svgNameIndex = 0;
      $('.uix-svgmap--china .uix-svgmap--china__name').each(function () {
        if (goName == $(this).data('title')) {
          svgCurName = $(this).data('title');
          return false;
        }
      });
      svgNameIndex = $('.uix-svgmap--china .uix-svgmap--china__name[data-title="' + svgCurName + '"]').index(); //Hide all elements

      svgMapRestore(1); //Display current element

      svgMapActive(svgNameIndex, goText);
    }); //Restore all elements
    //Do not add off() to this

    $(document.body).on('click', function (e) {
      svgMapRestore(2);
    });

    function svgMapRestore(type) {
      var alpha = type == 1 ? 0.3 : 1;
      $svgEl.children().removeClass('is-show');
      $svgEl.find('circle').css({
        'r': 6,
        'font-size': '6px',
        'z-index': 1,
        'opacity': alpha
      });
      $svgEl.find('.uix-svgmap--china__name').each(function () {
        $(this).css({
          'transform': 'translate(0,15px)',
          'z-index': 1,
          'opacity': alpha
        }).text($(this).data('title'));
      });
      $svgEl.find('.uix-svgmap--china__num').css({
        'font-size': '6px',
        'z-index': 1,
        'opacity': alpha
      });
    }

    function svgMapActive(index, text) {
      $svgEl.each(function () {
        $(this).children().eq(index).addClass('is-show');
        $(this).find('circle').eq(index).css({
          'r': 15,
          'z-index': 2,
          'opacity': 1
        });
        $(this).find('.uix-svgmap--china__name').eq(index).css({
          'transform': 'translate(0,25px)',
          'z-index': 2,
          'opacity': 1
        }).text(text);
        $(this).find('.uix-svgmap--china__num').eq(index).css({
          'font-size': '10px',
          'z-index': 2,
          'opacity': 1
        });
      });
    }
  };

  module.components.documentReady.push(module.SVG_MAP_CHINA.documentReady);
  return function SVG_MAP_CHINA() {
    china_classCallCheck(this, SVG_MAP_CHINA);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/svg-map/js/world.js
function world_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- SVG Map (World) -->
 *************************************
 */


var SVG_MAP_WORLD = function (module, $, window, document) {
  if (window.SVG_MAP_WORLD === null) return false;
  module.SVG_MAP_WORLD = module.SVG_MAP_WORLD || {};
  module.SVG_MAP_WORLD.version = '0.0.2';

  module.SVG_MAP_WORLD.documentReady = function ($) {
    var $svgEl = $('.uix-svgmap--world');
    $(document).off('click.SVG_MAP_WORLD').on('click.SVG_MAP_WORLD', '.uix-svgmap--world__trigger a', function (e) {
      // stop propagation of this event, it will never reach body in bubbling phase.
      e.stopPropagation();
      var goName = $(this).data('title'),
          goText = $(this).text();
      var svgCurName = '',
          svgNameIndex = 0;
      $('.uix-svgmap--world .uix-svgmap--world__name').each(function (index) {
        if (goName == $(this).data('title')) {
          svgCurName = $(this).data('title');
          svgNameIndex = index;
          return false;
        }
      }); //Hide all elements

      svgMapRestore(1); //Display current element

      svgMapActive(svgNameIndex, goText);
    }); //Restore all elements
    //Do not add off() to this

    $(document.body).on('click', function (e) {
      svgMapRestore(2);
    });

    function svgMapRestore(type) {
      var alpha = type == 1 ? 0.3 : 1;
      $svgEl.children().removeClass('is-show');
      $svgEl.find('path').css({
        'z-index': 1,
        'opacity': alpha
      });
      $svgEl.find('.uix-svgmap--world__name').each(function () {
        $(this).css({
          'z-index': 1,
          'opacity': alpha,
          'font-size': '3px'
        }).text($(this).data('title'));
      });
      $svgEl.find('.uix-svgmap--world__num').css({
        'font-size': '6px',
        'z-index': 1,
        'opacity': alpha
      });
    }

    function svgMapActive(index, text) {
      $svgEl.each(function () {
        $(this).children().eq(index).addClass('is-show');
        $(this).find('path').eq(index).css({
          'z-index': 2,
          'opacity': 1
        });
        $(this).find('.uix-svgmap--world__name').eq(index).css({
          'z-index': 2,
          'opacity': 1,
          'font-size': '10px'
        }).text(text);
        $(this).find('.uix-svgmap--world__num').eq(index).css({
          'font-size': '10px',
          'z-index': 2,
          'opacity': 1
        });
      });
    }
  };

  module.components.documentReady.push(module.SVG_MAP_WORLD.documentReady);
  return function SVG_MAP_WORLD() {
    world_classCallCheck(this, SVG_MAP_WORLD);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-background-three/js/index.js
function simple_3D_background_three_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Background 1 with three.js -->
 *************************************
 */

/**
 * module.THREE_BACKGROUND_THREE
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_BACKGROUND_THREE = function (module, $, window, document) {
  if (window.THREE_BACKGROUND_THREE === null) return false;
  module.THREE_BACKGROUND_THREE = module.THREE_BACKGROUND_THREE || {};
  module.THREE_BACKGROUND_THREE.version = '0.0.5';

  module.THREE_BACKGROUND_THREE.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-background-three-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-background-three-canvas'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          scene,
          light,
          renderer,
          displacementSprite,
          shaderSprite,
          clock = new THREE.Clock(); // controls

      var spriteAnim = false;
      var mouseX = 0,
          mouseY = 0,
          windowHalfX = windowWidth / 2,
          windowHalfY = windowHeight / 2;
      var targetX = 0.0,
          targetY = 0.0,
          angle = 0.0,
          height = 0.0,
          target = new THREE.Vector3(); // Load multiple ShaderFrog shaders

      var runtime = new ShaderRuntime();
      runtime.load([$('#' + rendererCanvasID).data('shader-url')], function (shaders) {
        // Get the Three.js material you can assign to your objects
        var material = runtime.get(shaders[0].name);
        shaderSprite.material = material;
      });

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 100, 2000000);
        camera.position.set(0, 100, 2000);
        runtime.registerCamera(camera); //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        scene.add(light); //WebGL Renderer		

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight); //Add shader background

        var geometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 2);
        shaderSprite = new THREE.Mesh(geometry);
        shaderSprite.scale.setScalar(10000);
        shaderSprite.renderDepth = 0;
        scene.add(shaderSprite); // Immediately use the texture for material creation

        var defaultMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          flatShading: true,
          vertexColors: THREE.VertexColors
        });
        displacementSprite = new THREE.Mesh(generateGeometry('sphere', 200), defaultMaterial);
        scene.add(displacementSprite); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
      }

      function render() {
        requestAnimationFrame(render);
        var objVector = new THREE.Vector3(0, 0.2, 0.1),
            delta = clock.getDelta();

        if (!spriteAnim) {
          displacementSprite.rotation.x += delta * objVector.x;
          displacementSprite.rotation.y += delta * objVector.y;
          displacementSprite.rotation.z += delta * objVector.z;
        } //To set a background color.


        renderer.setClearColor(0x000000); //update shaders

        runtime.updateShaders(clock.getElapsedTime()); // update camera

        targetX = mouseX * .002;
        targetY = mouseY * .002;
        angle += 0.01 * (targetX - angle);
        height += 0.01 * (targetY - height);
        var x = -Math.sin(angle * 1.5) * 35;
        var z = Math.cos(angle * 1.5) * 35;
        var y = 130 * height + 0;
        camera.position.set(x, y, z);
        camera.lookAt(target); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }

      function onDocumentMouseDown(event) {
        event.preventDefault();
        spriteAnim = true;
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }

      function onDocumentMouseUp(event) {
        event.preventDefault();
        spriteAnim = false;
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }
      /*
       * Batch generation of geometry
       *
       * @param  {String} objectType     - String of geometry type identifier.
       * @param  {Number} numObjects       - The total number of generated objects.
       * @return {Void}
       */


      function generateGeometry(objectType, numObjects) {
        var geometry = new THREE.Geometry();

        var applyVertexColors = function applyVertexColors(g, c) {
          g.faces.forEach(function (f) {
            var n = f instanceof THREE.Face3 ? 3 : 4;

            for (var j = 0; j < n; j++) {
              f.vertexColors[j] = c;
            }
          });
        };

        for (var i = 0; i < numObjects; i++) {
          var position = new THREE.Vector3();
          position.x = Math.random() * 10000 - 5000;
          position.y = Math.random() * 6000 - 3000;
          position.z = Math.random() * 8000 - 4000;
          var rotation = new THREE.Euler();
          rotation.x = Math.random() * 2 * Math.PI;
          rotation.y = Math.random() * 2 * Math.PI;
          rotation.z = Math.random() * 2 * Math.PI;
          var scale = new THREE.Vector3();
          scale.x = Math.random() * 200 + 100;
          var geom = void 0;
          var color = new THREE.Color();

          if (objectType == "cube") {
            geom = new THREE.BoxGeometry(1, 1, 1);
            scale.y = Math.random() * 200 + 100;
            scale.z = Math.random() * 200 + 100;
            color.setRGB(0, 0, Math.random() + 0.1);
          } else if (objectType == "sphere") {
            geom = new THREE.IcosahedronGeometry(1, 1);
            scale.y = scale.z = scale.x;
            color.setRGB(0.35, getRandomFloat(0.12, 0.3), 0.2);
          } else if (objectType == "poly") {
            geom = new THREE.CylinderGeometry(3, 6, 3, 5, 1);
            scale.y = Math.random() * 30;
            scale.z = Math.random() * 30;
            color.setRGB(Math.random() + 0.1, 0, 0);
          } // give the geom's vertices a random color, to be displayed


          applyVertexColors(geom, color);
          var object = new THREE.Mesh(geom);
          object.position.copy(position);
          object.rotation.copy(rotation);
          object.scale.copy(scale);
          object.updateMatrix();
          geometry.merge(object.geometry, object.matrix);
        }

        return geometry;
      } //Generate random number between two numbers


      function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_BACKGROUND_THREE.documentReady);
  return function THREE_BACKGROUND_THREE() {
    simple_3D_background_three_js_classCallCheck(this, THREE_BACKGROUND_THREE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-background-three2/js/shader/fragment-custom.glsl
/* harmony default export */ var fragment_custom = ("#define GLSLIFY 1\nuniform float time;\n\nuniform sampler2D texture;\n\nvarying vec2 vUv;\n\nvoid main( void ) {\n\n    vec2 position = - 1.0 + 2.0 * vUv;\n\n    float a = atan( position.y, position.x );\n    float r = sqrt( dot( position, position ) );\n\n    vec2 uv;\n    uv.x = cos( a ) / r;\n    uv.y = sin( a ) / r;\n    uv /= 10.0;\n    uv += time * 0.05;\n\n    vec3 color = texture2D( texture, uv ).rgb;\n\n    gl_FragColor = vec4( color * r * 1.5, 1.0 );\n\n}");
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-background-three2/js/shader/vertex-custom.glsl
/* harmony default export */ var vertex_custom = ("#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main()\n{\n    vUv = uv;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n}");
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-background-three2/js/index.js
function simple_3D_background_three2_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Background 2 with three.js -->
 *************************************
 */

/**
 * module.THREE_BACKGROUND_THREE2
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */



var THREE_BACKGROUND_THREE2 = function (module, $, window, document) {
  if (window.THREE_BACKGROUND_THREE2 === null) return false;
  module.THREE_BACKGROUND_THREE2 = module.THREE_BACKGROUND_THREE2 || {};
  module.THREE_BACKGROUND_THREE2.version = '0.0.4';

  module.THREE_BACKGROUND_THREE2.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-background-three-canvas2').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-background-three-canvas2'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          scene,
          renderer,
          material,
          displacementSprite,
          clock = new THREE.Clock();
      var mouseVector = new THREE.Vector2();
      var mouseX = 0;
      var mouseY = 0;

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(50, windowWidth / windowHeight, .01, 1000);
        camera.position.set(0, 0, 1.8); //Scene

        scene = new THREE.Scene(); //WebGL Renderer	

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight); // Immediately use the texture for material creation

        material = new THREE.ShaderMaterial({
          uniforms: {
            "time": {
              value: 1.0
            },
            "texture": {
              value: new THREE.TextureLoader().load($('#' + rendererCanvasID).data('filter-texture'))
            }
          },
          fragmentShader: fragment_custom,
          vertexShader: vertex_custom
        }); //if use texture

        material.uniforms.texture.value.wrapS = THREE.RepeatWrapping;
        material.uniforms.texture.value.wrapT = THREE.RepeatWrapping;
        var geometry = new THREE.SphereGeometry(5, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
        displacementSprite = new THREE.Mesh(geometry, material);
        scene.add(displacementSprite); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
      }

      function render() {
        requestAnimationFrame(render);
        var delta = clock.getDelta(); //To set a background color.

        renderer.setClearColor(0x000000);
        material.uniforms.time.value += delta * 5; //displacementSprite.rotation.y += delta * 0.5 * 1;
        //displacementSprite.rotation.x += delta * 0.5 * -1;
        //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseMove(event) {
        var rect = renderer.domElement.getBoundingClientRect();
        displacementSprite.position.z = (event.clientX - rect.left) / rect.width * 4 - 1;
      }

      function avgArr(arr) {
        var total = arr.reduce(function (sum, b) {
          return sum + b;
        });
        return total / arr.length;
      }

      function maxArr(arr) {
        return arr.reduce(function (a, b) {
          return Math.max(a, b);
        });
      }

      function degToRad(degrees) {
        return degrees * Math.PI / 180;
      }

      function round(n, digits) {
        return Number(n.toFixed(digits));
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_BACKGROUND_THREE2.documentReady);
  return function THREE_BACKGROUND_THREE2() {
    simple_3D_background_three2_js_classCallCheck(this, THREE_BACKGROUND_THREE2);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-background-three3/js/index.js
function simple_3D_background_three3_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Background 3 with three.js -->
 *************************************
 */

/**
 * module.THREE_BACKGROUND_THREE3
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_BACKGROUND_THREE3 = function (module, $, window, document) {
  if (window.THREE_BACKGROUND_THREE3 === null) return false;
  module.THREE_BACKGROUND_THREE3 = module.THREE_BACKGROUND_THREE3 || {};
  module.THREE_BACKGROUND_THREE3.version = '0.0.2';

  module.THREE_BACKGROUND_THREE3.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-background-three-canvas3').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-background-three-canvas3'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          scene,
          renderer,
          displacementSprite,
          theta = 0;
      var mouseVector = new THREE.Vector2(),
          sphereTarget = new THREE.Euler(),
          xrad = THREE.Math.degToRad(30),
          yrad = THREE.Math.degToRad(10);

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(50, windowWidth / windowHeight, .01, 1000);
        camera.position.set(0, 0, 1.8); //Scene

        scene = new THREE.Scene(); //WebGL Renderer	

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight); // Immediately use the texture for material creation

        var sphereGeo = new THREE.SphereBufferGeometry(2, 12, 12);
        var sphereMat = new THREE.MeshBasicMaterial({
          color: 0x494949,
          wireframe: true
        });
        displacementSprite = new THREE.Mesh(sphereGeo, sphereMat);
        displacementSprite.position.y = -0.2;
        scene.add(displacementSprite); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
      }

      function render() {
        requestAnimationFrame(render);
        theta += 0.1; //To set a background color.

        renderer.setClearColor(0x000000);
        lerp(displacementSprite.rotation, 'x', sphereTarget.x);
        lerp(displacementSprite.rotation, 'y', sphereTarget.y); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseMove(event) {
        // NDC -1 to 1
        var rect = renderer.domElement.getBoundingClientRect();
        mouseVector.x = (event.clientX - rect.left) / rect.width * 2 - 1;
        mouseVector.y = (event.clientY - rect.top) / rect.height * -2 + 1;
        sphereTarget.y = mouseVector.x * xrad;
        sphereTarget.x = -mouseVector.y * yrad;
      } //Calculate the interpolation of two vectors


      function lerp(object, prop, destination) {
        if (object && object[prop] !== destination) {
          object[prop] += (destination - object[prop]) * 0.1;

          if (Math.abs(destination - object[prop]) < 0.001) {
            object[prop] = destination;
          }
        }
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_BACKGROUND_THREE3.documentReady);
  return function THREE_BACKGROUND_THREE3() {
    simple_3D_background_three3_js_classCallCheck(this, THREE_BACKGROUND_THREE3);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/simple-3D-background/scss/_style.scss
var simple_3D_background_scss_style = __webpack_require__(58);

// CONCATENATED MODULE: ./src/components/ES6/simple-3D-background/js/index.js
function simple_3D_background_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple_3D_background_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { simple_3D_background_js_typeof = function _typeof(obj) { return typeof obj; }; } else { simple_3D_background_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return simple_3D_background_js_typeof(obj); }

/* 
 *************************************
 * <!-- 3D Background -->
 *************************************
 */


var THREE_BACKGROUND = function (module, $, window, document) {
  if (window.THREE_BACKGROUND === null) return false;
  module.THREE_BACKGROUND = module.THREE_BACKGROUND || {};
  module.THREE_BACKGROUND.version = '0.0.2';

  module.THREE_BACKGROUND.documentReady = function ($) {
    //grab each 3dAnimate element and pass it into the animate function along with the config data
    $('[data-3d-animate]').each(function (index, element) {
      var config = $(element).data('3d-animate');

      if (simple_3D_background_js_typeof(config) === ( true ? "undefined" : undefined)) {
        config = false;
      }

      if (config) {
        if (Object.prototype.toString.call(config.offset) == '[object Array]') {
          animate3dMultiElement(config.offset[0], config.offset[1], element, config.reset);
        } else {
          animate3dElement(config.offset, element, config.reset);
        }
      }
    });
    /*
     * Sets an animation for each element
     *
     * @param  {Number} base           - Base offset value.
     * @param  {String} obj            - An HTML element.
     * @param  {Boolean} reset         - Reset block on mouse leave
     * @return {Void}
     */

    function animate3dElement(base, obj, reset) {
      var $el = $(obj),
          w = $el.innerWidth(),
          h = $el.innerHeight(); //			TweenMax.set( $el, {
      //				perspective    : 500,
      //				transformStyle : "preserve-3d"
      //			});
      // mouse move on block

      $(obj).on('mousemove touchmove', function (e) {
        var mX, mY, rmX, rmY;
        var touches = e.originalEvent.touches;

        if (touches && touches.length) {
          mX = touches[0].pageX;
          mY = touches[0].pageY;
        } else {
          mX = e.pageX;
          mY = e.pageY;
        } //Find mouse position relative to element


        rmX = mX - $(this).offset().left;
        rmY = mY - $(this).offset().top; //console.log('X: ' + rmX + ' Y: ' + rmY );
        // function to run matrix3D effect on block

        var tX = mousePosition(rmX, w),
            tY = mousePosition(rmY, h);
        TweenMax.to($(this), 0.2, {
          rotationY: tX,
          rotationX: tY,
          backgroundPosition: tX + 120 + "% 50%"
        });
      });

      if (reset) {
        $(obj).on('mouseleave touchcancel', function () {
          TweenMax.to($(this), 0.5, {
            rotationY: 0,
            rotationX: 0,
            backgroundPosition: "120% 50%"
          });
        });
      } // make some calculations for mouse position


      function mousePosition(mousePos, dimension) {
        return Math.floor(mousePos / dimension * (base * 2)) - base;
      }
    }
    /*
     * Sets an animation with parallax for each element
     *
     * @param  {Number} base           - Base offset value.
     * @param  {Number} multiple       - The power of target number.
     * @param  {String} obj            - An HTML element.
     * @param  {Boolean} reset         - Reset block on mouse leave
     * @return {Void}
     */


    function animate3dMultiElement(base, multiple, obj, reset) {
      //get the specs of the element
      var divOffset = $(obj).offset(),
          divTop = divOffset.top,
          divLeft = divOffset.left,
          divWidth = $(obj).innerWidth(),
          divHeight = $(obj).innerHeight(); //set an onmousemove event on the element

      $(obj).on('mousemove touchmove', function (e) {
        var pctX, pctY;
        var touches = e.originalEvent.touches;

        if (touches && touches.length) {
          pctX = (touches[0].pageX - divLeft) / divWidth;
          pctY = (touches[0].pageY - divTop) / divHeight;
        } else {
          pctX = (e.pageX - divLeft) / divWidth;
          pctY = (e.pageY - divTop) / divHeight;
        }

        $(this).children().each(function (index, elementSub) {
          var x = pctX * (base * Math.pow(multiple, index)),
              y = pctY * (base * Math.pow(multiple, index)),
              z = 0,
              deg = pctY * (180 / Math.PI),
              rotateDeg = parseFloat(deg - 35);
          TweenMax.to($(elementSub), 0.2, {
            css: {
              'transform': 'translate(' + x + 'px ,' + y + 'px) rotate3d( -1, 1, 0, ' + rotateDeg + 'deg )'
            }
          });
        });
      });

      if (reset) {
        $(obj).on('mouseleave touchcancel', function () {
          $(this).children().each(function (index, elementSub) {
            TweenMax.to($(elementSub), 0.5, {
              css: {
                'transform': 'translate(0,0) rotate3d( -1, 1, 0, 0deg )'
              }
            });
          });
        });
      }
    }
  };

  module.components.documentReady.push(module.THREE_BACKGROUND.documentReady);
  return function THREE_BACKGROUND() {
    simple_3D_background_js_classCallCheck(this, THREE_BACKGROUND);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/simple-3D-carousel/scss/_style.scss
var simple_3D_carousel_scss_style = __webpack_require__(59);

// CONCATENATED MODULE: ./src/components/ES6/simple-3D-carousel/js/index.js
function simple_3D_carousel_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple_3D_carousel_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { simple_3D_carousel_js_typeof = function _typeof(obj) { return typeof obj; }; } else { simple_3D_carousel_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return simple_3D_carousel_js_typeof(obj); }

/* 
 *************************************
 * <!-- 3D Carousel -->
 *************************************
 */

/**
 * module.THREE_CAROUSEL
 * 
 * @requires ./examples/assets/js/min/hammer.min.js
 */


var THREE_CAROUSEL = function (module, $, window, document) {
  if (window.THREE_CAROUSEL === null) return false;
  module.THREE_CAROUSEL = module.THREE_CAROUSEL || {};
  module.THREE_CAROUSEL.version = '0.0.1';

  module.THREE_CAROUSEL.documentReady = function ($) {
    $('.uix-3d-carousel').each(function () {
      var $this = $(this);
      var $wrapper = $this.find('> ul'),
          $items = $wrapper.find('> li'),
          itemCount = $items.length;
      var dataTiming = $this.data('timing'),
          dataPrevBtn = $this.data('prev-btn'),
          dataNextBtn = $this.data('next-btn'),
          dataDraggable = $this.data('draggable'),
          autoSwap = null,
          items = [],
          startItem = 1,
          position = 0,
          leftpos = itemCount,
          resetCount = itemCount;
      if (simple_3D_carousel_js_typeof(dataTiming) === ( true ? "undefined" : undefined)) dataTiming = 5000;
      if (simple_3D_carousel_js_typeof(dataPrevBtn) === ( true ? "undefined" : undefined)) dataPrevBtn = ".my-carousel-3d-prev";
      if (simple_3D_carousel_js_typeof(dataNextBtn) === ( true ? "undefined" : undefined)) dataNextBtn = ".my-carousel-3d-next";
      if (simple_3D_carousel_js_typeof(dataDraggable) === ( true ? "undefined" : undefined)) dataDraggable = false; //Avoid problems caused by insufficient quantity
      //-------------------------------------		

      if (itemCount == 3) {
        var $clone3 = $items.eq(1).clone();
        $items.last().after($clone3);
      }

      if (itemCount == 2) {
        var $clone2_1 = $items.eq(0).clone(),
            $clone2_2 = $items.eq(1).clone();
        $items.last().after([$clone2_1, $clone2_2]);
      }

      if (itemCount == 1) {
        var $clone1_1 = $items.eq(0).clone(),
            $clone1_2 = $items.eq(0).clone(),
            $clone1_3 = $items.eq(0).clone();
        $items.last().after([$clone1_1, $clone1_2, $clone1_3]);
      } //New objects of items and wrapper


      $wrapper = $this.find('> ul');
      $items = $wrapper.find('> li');
      itemCount = $items.length;
      leftpos = itemCount;
      resetCount = itemCount; //Adding an index to an element makes it easy to query
      //-------------------------------------	

      $items.each(function (index) {
        items[index] = $(this).text();
        $(this).attr('id', index + 1);
      }); //Pause slideshow and reinstantiate on mouseout
      //-------------------------------------	

      $wrapper.on('mouseenter', function () {
        clearInterval(autoSwap);
      }).on('mouseleave', function () {
        autoSwap = setInterval(itemUpdates, dataTiming);
      }); //Initialize the default effect
      //-------------------------------------	

      itemUpdates('clockwise'); //The matched click events for the element.
      //-------------------------------------	

      $(dataPrevBtn).on('click', function (e) {
        e.preventDefault();
        itemUpdates('clockwise');
        return false;
      });
      $(dataNextBtn).on('click', function (e) {
        e.preventDefault();
        itemUpdates('counter-clockwise');
        return false;
      });
      $items.on('click', function (e) {
        e.preventDefault();

        if ($(this).attr('class') == 'uix-3d-carousel__item uix-3d-carousel__item--left-pos') {
          itemUpdates('counter-clockwise');
        } else {
          itemUpdates('clockwise');
        }
      }); //Drag and Drop
      //-------------------------------------	

      var $dragDropTrigger = $wrapper;
      var hammerProps = {};

      if (!dataDraggable) {
        hammerProps = {
          inputClass: Hammer.TouchInput
        };
      } //Mouse event
      //Hammer.js pan event only for touch devices and not for desktop computer Click+Drag


      var direction;
      var dragDropElement = $dragDropTrigger[0],
          dragDropMC = new Hammer(dragDropElement, hammerProps);
      dragDropMC.on('panright press panleft', function (ev) {
        //Set the direction in here
        direction = ev.type;
      });
      dragDropMC.on('panend', function (ev) {
        //Use the direction in here
        //You know the pan has ended
        //and you know which action they were taking
        if (direction == 'panleft') {
          itemUpdates('clockwise');
        }

        if (direction == 'panright') {
          itemUpdates('counter-clockwise');
        }
      });
      /*
       * Swap Between Images
       *
       * @param  {String} action           - Direction of movement, optional: clockwise, counter-clockwise
       * @return {Void}
       */

      function itemUpdates(action) {
        var direction = action; //moving carousel backwards

        if (direction == 'counter-clockwise') {
          var leftitem = parseFloat($wrapper.find('> li.uix-3d-carousel__item--left-pos').attr('id') - 1);

          if (leftitem == 0) {
            leftitem = itemCount;
          }

          $wrapper.find('> li.uix-3d-carousel__item--right-pos').removeClass('uix-3d-carousel__item--right-pos').addClass('uix-3d-carousel__item--back-pos');
          $wrapper.find('> li.uix-3d-carousel__item--main-pos').removeClass('uix-3d-carousel__item--main-pos').addClass('uix-3d-carousel__item--right-pos');
          $wrapper.find('> li.uix-3d-carousel__item--left-pos').removeClass('uix-3d-carousel__item--left-pos').addClass('uix-3d-carousel__item--main-pos');
          $wrapper.find('> li#' + leftitem + '').removeClass('uix-3d-carousel__item--back-pos').addClass('uix-3d-carousel__item--left-pos');
          startItem--;

          if (startItem < 1) {
            startItem = itemCount;
          }
        } //moving carousel forward


        if (direction == 'clockwise' || direction == '' || direction == null) {
          var carousel3DPos = function carousel3DPos(dir) {
            if (dir != 'leftposition') {
              //increment image list id
              position++; //if final result is greater than image count, reset position.

              if (startItem + position > resetCount) {
                position = 1 - startItem;
              }
            } //setting the left positioned item


            if (dir == 'leftposition') {
              //left positioned image should always be one left than main positioned image.
              position = startItem - 1; //reset last image in list to left position if first image is in main position

              if (position < 1) {
                position = itemCount;
              }
            }

            return position;
          };

          $wrapper.find('> li#' + startItem + '').removeClass('uix-3d-carousel__item--main-pos').addClass('uix-3d-carousel__item--left-pos');
          $wrapper.find('> li#' + (startItem + carousel3DPos()) + '').removeClass('uix-3d-carousel__item--right-pos').addClass('uix-3d-carousel__item--main-pos');
          $wrapper.find('> li#' + (startItem + carousel3DPos()) + '').removeClass('uix-3d-carousel__item--back-pos').addClass('uix-3d-carousel__item--right-pos');
          $wrapper.find('> li#' + carousel3DPos('leftposition') + '').removeClass('uix-3d-carousel__item--left-pos').addClass('uix-3d-carousel__item--back-pos');
          startItem++;
          position = 0;

          if (startItem > itemCount) {
            startItem = 1;
          }
        }
      }
    });
  };

  module.components.documentReady.push(module.THREE_CAROUSEL.documentReady);
  return function THREE_CAROUSEL() {
    simple_3D_carousel_js_classCallCheck(this, THREE_CAROUSEL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-gallery/js/index.js
function simple_3D_gallery_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple_3D_gallery_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { simple_3D_gallery_js_typeof = function _typeof(obj) { return typeof obj; }; } else { simple_3D_gallery_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return simple_3D_gallery_js_typeof(obj); }

/* 
 *************************************
 * <!-- 3D Gallery with three.js -->
 *************************************
 */

/**
 * module.THREE_GALLERY
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_GALLERY = function (module, $, window, document) {
  if (window.THREE_GALLERY === null) return false;
  module.THREE_GALLERY = module.THREE_GALLERY || {};
  module.THREE_GALLERY.version = '0.0.4';

  module.THREE_GALLERY.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-gallery-three-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-gallery-three-canvas'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          controls,
          scene,
          light,
          renderer,
          displacementSprite,
          theta = 0;
      var offsetWidth = 1400,
          offsetHeight = 933,
          allImages = [],
          imgTotal,
          imagesLoaded = false; // we will keep track of the scroll

      var scrollValue = 0;
      var lastScrollValue = 0;

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 1, 10000);
        camera.position.set(0, 0, 1000); //controls

        controls = new THREE.OrbitControls(camera);
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.5;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.enableZoom = false;
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 100;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(30, 167, 81);
        controls.update(); //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        scene.add(light); //WebGL Renderer	

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight); // Immediately use the texture for material creation
        // Create a texture loader so we can load our image file

        var imgs = ['https://placekitten.com/2100/2100', 'https://placekitten.com/2200/2200', 'https://placekitten.com/2300/2300', 'https://placekitten.com/2400/2400', 'https://placekitten.com/2500/2500', 'https://placekitten.com/2000/2000', 'https://placekitten.com/1600/1600', 'https://placekitten.com/1650/1650', 'https://placekitten.com/1670/1670', 'https://placekitten.com/1680/1680', 'https://placekitten.com/1700/1700']; //A loader for loading all images from array.

        var loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous'; //Preload

        imgTotal = imgs.length;
        var gap = 100,
            circumference = (offsetWidth + gap) * imgTotal,
            //get circumference from all images width
        galleryRadius = circumference / (Math.PI * 2),
            // C = 2πr = Math.PI * 2 * radius
        eachItemAngleToRad = Math.PI * 2 / imgTotal; // 360° = 2π = Math.PI * 2

        if (camera.position.length() > galleryRadius) {
          camera.position.set(0, 0, 0);
        } //Load images


        imgs.forEach(function (element, index) {
          loadImage(loader, element, index, offsetWidth, offsetHeight, imgTotal, eachItemAngleToRad, galleryRadius, $('#3D-gallery-three-canvas__loader'));
        }); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
      }

      function render() {
        requestAnimationFrame(render);
        theta += 0.1; //To set a background color.

        renderer.setClearColor(0x000000); // listen to scroll to update

        var delta = scrollValue - lastScrollValue; // threshold

        if (delta > 60) {
          delta = 60;
        } else if (delta < -60) {
          delta = -60;
        }

        camera.position.x = camera.position.x + delta; //check all images loaded

        if (simple_3D_gallery_js_typeof(allImages) != ( true ? "undefined" : undefined)) {
          if (!imagesLoaded && allImages.length === imgTotal) {
            allImages.forEach(function (element) {
              scene.add(element);
            });
            imagesLoaded = true;
          }
        } //update camera and controls


        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      } // listen to scroll


      window.addEventListener('scroll', function (e) {
        lastScrollValue = scrollValue;
        scrollValue = window.pageYOffset;
        console.log('lastScrollValue: ' + lastScrollValue + ', scrollValue: ' + scrollValue);
      });
      /*
       * Load Image
       *
       * @param  {Element} imgLoader       - A loader for loading all images from array.
       * @param  {String} src             - URL of image.
       * @param  {Number} index           - Index of image.
       * @param  {Number} w               - The width of an image, in pixels. 
       * @param  {Number} h               - The height of an image, in pixels. 
       * @param  {Number} total           - Total number of preload images.
       * @param  {Number} itemRadAngle    - An equal radian angle of a sphere for each element.
       * @param  {Number} radius          - Radius length of the sphere (circumference).
       * @param  {Element|String} loading         - Progress bar display control.
       * @return {Void}
       */

      function loadImage(imgLoader, src, index, w, h, total, itemRadAngle, radius, loading) {
        // load a resource
        imgLoader.load( // resource URL
        src, // onLoad callback
        function (texture) {
          // in this example we create the material when the texture is loaded
          var material = new THREE.MeshBasicMaterial({
            map: texture
          });
          var geometry = new THREE.PlaneGeometry(w, h);
          var mesh = new THREE.Mesh(geometry, material); //LinearFilter, which takes the four closest texels and bilinearly interpolates among them. 

          mesh.minFilter = THREE.LinearFilter;
          mesh.overdraw = true; //Calculate the position of the image 
          //X axis: a = sinA * c = Math.sin( rad ) * radius
          //Z axis: b = cosA * c = Math.cos( rad ) * radius

          mesh.rotation.y = -index * itemRadAngle;
          mesh.position.set(radius * Math.sin(index * itemRadAngle), 0, -radius * Math.cos(index * itemRadAngle));
          allImages.push(mesh); //loading

          TweenMax.to(loading, 0.5, {
            width: Math.round(100 * allImages.length / total) + '%',
            onComplete: function onComplete() {
              if ($(this.target).width() >= windowWidth - 50) {
                TweenMax.to(this.target, 0.5, {
                  alpha: 0
                });
              }
            }
          });
        }, // onProgress callback currently not supported
        undefined, // onError callback
        function (err) {
          console.error('An error happened.');
        });
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_GALLERY.documentReady);
  return function THREE_GALLERY() {
    simple_3D_gallery_js_classCallCheck(this, THREE_GALLERY);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-image-transition/js/shader/fragment-custom.glsl
/* harmony default export */ var shader_fragment_custom = ("#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D texture;\nuniform sampler2D texture2;\nuniform sampler2D disp;\n\n// uniform float time;\n// uniform float _rot;\nuniform float dispFactor;\nuniform float effectFactor;\n\n// vec2 rotate(vec2 v, float a) {\n//  float s = sin(a);\n//  float c = cos(a);\n//  mat2 m = mat2(c, -s, s, c);\n//  return m * v;\n// }\n\nvoid main() {\n\n    vec2 uv = vUv;\n\n    // uv -= 0.5;\n    // vec2 rotUV = rotate(uv, _rot);\n    // uv += 0.5;\n\n    vec4 disp = texture2D(disp, uv);\n\n    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);\n    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);\n\n    vec4 _texture = texture2D(texture, distortedPosition);\n    vec4 _texture2 = texture2D(texture2, distortedPosition2);\n\n    vec4 finalTexture = mix(_texture, _texture2, dispFactor);\n\n    gl_FragColor = finalTexture;\n    // gl_FragColor = disp;\n}");
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-image-transition/js/shader/vertex-custom.glsl
/* harmony default export */ var shader_vertex_custom = ("#define GLSLIFY 1\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}");
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-image-transition/js/index.js
function simple_3D_image_transition_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Image Transition with three.js -->
 *************************************
 */

/**
 * module.THREE_IMAGE_TRANSITION
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */



var THREE_IMAGE_TRANSITION = function (module, $, window, document) {
  if (window.THREE_IMAGE_TRANSITION === null) return false;
  module.THREE_IMAGE_TRANSITION = module.THREE_IMAGE_TRANSITION || {};
  module.THREE_IMAGE_TRANSITION.version = '0.0.3';

  module.THREE_IMAGE_TRANSITION.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-imagetransition-three-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-imagetransition-three-canvas'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          controls,
          scene,
          light,
          renderer,
          displacementSprite,
          theta = 0;
      var filterMaterial,
          offsetWidth = $('#' + rendererCanvasID).parent().width(),
          offsetHeight = $('#' + rendererCanvasID).parent().width() * (550 / 1400);

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 1, 10000);
        camera.position.set(0, 0, 1000); //controls

        controls = new THREE.OrbitControls(camera);
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.5;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.enableZoom = false;
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 100;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(30, 167, 81);
        controls.update(); //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        scene.add(light); //WebGL Renderer	

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(offsetWidth, offsetHeight); // Immediately use the texture for material creation
        // Create a texture loader so we can load our image file

        var imgs = ['https://placekitten.com/1400/550', 'https://placekitten.com/1410/550'];
        var loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';
        var texture1 = loader.load(imgs[0]),
            texture2 = loader.load(imgs[1]),
            intensity = 1,
            dispImage = $('#' + rendererCanvasID).data('filter-texture'),
            //Load displacement image
        disp = loader.load(dispImage);
        disp.wrapS = disp.wrapT = THREE.RepeatWrapping;
        texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
        texture1.minFilter = texture2.minFilter = THREE.LinearFilter;
        texture1.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture2.anisotropy = renderer.capabilities.getMaxAnisotropy();
        var geometry = new THREE.PlaneBufferGeometry(offsetWidth, offsetHeight, 1);
        filterMaterial = new THREE.ShaderMaterial({
          uniforms: {
            effectFactor: {
              type: "f",
              value: intensity
            },
            dispFactor: {
              type: "f",
              value: 0.0
            },
            texture: {
              type: "t",
              value: texture1
            },
            texture2: {
              type: "t",
              value: texture2
            },
            disp: {
              type: "t",
              value: disp
            }
          },
          vertexShader: shader_vertex_custom,
          fragmentShader: shader_fragment_custom,
          transparent: true,
          opacity: 1.0
        });
        displacementSprite = new THREE.Mesh(geometry, filterMaterial);
        displacementSprite.position.set(0, 0, 0);
        scene.add(displacementSprite); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false); // When the mouse moves, call the given function

        document.getElementById(rendererCanvasID).addEventListener('mouseenter', onDocumentMouseEnter, false);
        document.getElementById(rendererCanvasID).addEventListener('mouseleave', onDocumentMouseLeave, false);
      }

      function render() {
        requestAnimationFrame(render);
        theta += 0.1; //To set a background color.
        //renderer.setClearColor( 0x000000 );	
        //update camera and controls

        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseEnter(event) {
        TweenMax.to(filterMaterial.uniforms.dispFactor, 1.5, {
          value: 1,
          ease: Expo.easeOut
        });
      }

      function onDocumentMouseLeave(event) {
        TweenMax.to(filterMaterial.uniforms.dispFactor, 1, {
          value: 0,
          ease: Expo.easeOut
        });
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_IMAGE_TRANSITION.documentReady);
  return function THREE_IMAGE_TRANSITION() {
    simple_3D_image_transition_js_classCallCheck(this, THREE_IMAGE_TRANSITION);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-model/js/index.js
function simple_3D_model_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple_3D_model_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { simple_3D_model_js_typeof = function _typeof(obj) { return typeof obj; }; } else { simple_3D_model_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return simple_3D_model_js_typeof(obj); }

/* 
 *************************************
 * <!-- 3D Model -->
 *************************************
 */

/**
 * module.THREE_MODEL
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_MODEL = function (module, $, window, document) {
  if (window.THREE_MODEL === null) return false;
  module.THREE_MODEL = module.THREE_MODEL || {};
  module.THREE_MODEL.version = '0.0.3';

  module.THREE_MODEL.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-model-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-model-canvas'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          controls,
          scene,
          light,
          renderer,
          displacementSprite,
          radius = 100,
          theta = 0,
          clickEnable = false;
      var mouseVector = new THREE.Vector2();
      var INTERSECTED, INTERSECTED_CLICK, raycaster;

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 1, 10000);
        camera.position.set(0, 0, -1000); //controls

        controls = new THREE.OrbitControls(camera);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.enableZoom = true;
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 100;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(30, 167, 81);
        controls.update(); //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0xcccccc, 0.4));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        scene.add(light); //WebGL Renderer	

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight); // Immediately use the texture for material creation

        var manager = new THREE.LoadingManager();

        manager.onProgress = function (item, loaded, total) {
          console.log(item, loaded, total);
        };

        var textureURL = simple_3D_model_js_typeof($('#' + rendererCanvasID).data('texture-src')) != ( true ? "undefined" : undefined) ? $('#' + rendererCanvasID).data('texture-src') : templateUrl + '/assets/models/obj/project.png';
        var objURL = simple_3D_model_js_typeof($('#' + rendererCanvasID).data('model-src')) != ( true ? "undefined" : undefined) ? $('#' + rendererCanvasID).data('model-src') : templateUrl + '/assets/models/obj/project.obj';

        var textureLoader = new THREE.TextureLoader(manager),
            texture = textureLoader.load(textureURL),
            onProgress = function onProgress(xhr) {
          if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
          }
        },
            onError = function onError(xhr) {};

        var loader = new THREE.OBJLoader(manager);
        loader.load(objURL, function (object) {
          object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.material = new THREE.MeshPhongMaterial({
                color: 0x2194CE,
                wireframe: false,
                map: texture,
                side: THREE.DoubleSide
              });
            }
          });
          object.scale.set(165, 165, 165);
          object.position.y = 100;
          scene.add(object);
        }, onProgress, onError); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false); // When the mouse moves, call the given function

        raycaster = new THREE.Raycaster();
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
      }

      function render() {
        requestAnimationFrame(render);
        theta += 0.1; //To set a background color.
        //renderer.setClearColor( 0x000000 );	
        //Mouse interactions

        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xffcc00);
          }
        } else {
          if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
          INTERSECTED = null;
        } //update camera and controls


        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseMove(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      function onDocumentMouseDown(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        clickEnable = true; //Mouse interactions

        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
          if (INTERSECTED_CLICK != intersects[0].object) {
            INTERSECTED_CLICK = intersects[0].object;
            TweenMax.to(INTERSECTED_CLICK.scale, 1, {
              x: '+=' + (200 - INTERSECTED_CLICK.scale.x) * 0.05,
              y: '+=' + (200 - INTERSECTED_CLICK.scale.y) * 0.05,
              z: '+=' + (200 - INTERSECTED_CLICK.scale.z) * 0.05
            });
            INTERSECTED_CLICK.updateMatrix();
          }
        } else {
          INTERSECTED_CLICK = null;
        }
        /*
        // Parse all the faces
        for ( let i in intersects ) {
        		intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );
        	}
        */

      }

      function onDocumentMouseUp(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        theta = 0;
        clickEnable = false;
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_MODEL.documentReady);
  return function THREE_MODEL() {
    simple_3D_model_js_classCallCheck(this, THREE_MODEL);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-pages/js/index.js
function simple_3D_pages_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Pages -->
 *************************************
 */

/**
 * module.THREE_PAGES
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_PAGES = function (module, $, window, document) {
  if (window.THREE_PAGES === null) return false;
  module.THREE_PAGES = module.THREE_PAGES || {};
  module.THREE_PAGES.version = '0.0.2';

  module.THREE_PAGES.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-renderer').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var viewRenderer = '3D-renderer'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          controls,
          scene,
          light,
          renderer,
          clock = new THREE.Clock();

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 1, 10000);
        camera.position.set(0, 0, -1000); //controls

        controls = new THREE.OrbitControls(camera);
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.enableZoom = true;
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 1000;
        controls.maxDistance = 1500;
        controls.maxPolarAngle = Math.PI / 2; //Scene

        scene = new THREE.Scene(); //HemisphereLight

        light = new THREE.HemisphereLight(0xffbf67, 0x15c6ff);
        scene.add(light); //WebGL Renderer

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true
        });
        renderer.setClearColor(0xffffff, 0);
        renderer.setSize(windowWidth - 50, windowHeight - 50);
        renderer.domElement.style.zIndex = 5;
        document.getElementById(viewRenderer).appendChild(renderer.domElement); //Add HTML elements to scene

        var target = $('#html3D-view').clone(),
            pages = target.find('.html3D-view-content');
        pages.each(function () {
          var el = new THREE.CSS3DObject($.parseHTML($(this)[0].outerHTML)[0]);
          el.position.x = $(this).data('position-x') || 0;
          el.position.y = $(this).data('position-y') || 0;
          el.position.z = $(this).data('position-z') || 0;
          el.rotation.x = $(this).data('rotation-x') || 0;
          el.rotation.y = $(this).data('rotation-y') || 3.14159265358979;
          el.rotation.z = $(this).data('rotation-z') || 0;
          scene.add(el);
        }); //CSS3D Renderer

        renderer = new THREE.CSS3DRenderer();
        renderer.setSize(windowWidth, windowHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = 0;
        document.getElementById(viewRenderer).appendChild(renderer.domElement); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
      }

      function render() {
        requestAnimationFrame(render);
        var delta = clock.getDelta(); //update camera and controls

        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_PAGES.documentReady);
  return function THREE_PAGES() {
    simple_3D_pages_js_classCallCheck(this, THREE_PAGES);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-particle-effect/js/index.js
function simple_3D_particle_effect_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple_3D_particle_effect_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { simple_3D_particle_effect_js_typeof = function _typeof(obj) { return typeof obj; }; } else { simple_3D_particle_effect_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return simple_3D_particle_effect_js_typeof(obj); }

/* 
 *************************************
 * <!-- 3D Particle Effect -->
 *************************************
 */

/**
 * module.THREE_PARTICLE
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_PARTICLE = function (module, $, window, document) {
  if (window.THREE_PARTICLE === null) return false;
  module.THREE_PARTICLE = module.THREE_PARTICLE || {};
  module.THREE_PARTICLE.version = '0.0.6';

  module.THREE_PARTICLE.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-particle-effect-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-particle-effect-canvas';
      var renderer,
          texture,
          scene,
          camera,
          particles,
          imagedata,
          clock = new THREE.Clock(),
          mouseX = 0,
          mouseY = 0,
          isMouseDown = true,
          lastMousePos = {
        x: 0,
        y: 0
      },
          windowHalfX = windowWidth / 2,
          windowHalfY = windowHeight / 2; //background

      var backgroundBg = 0xCE3A3E;
      var backgroundPlane = 0xDE510E; // Light from scene ready

      var sceneForLightPlane, sceneForSpotLight, sceneForAmbientLight; // camera data

      var fieldOfView, aspectRatio, nearPlane, farPlane;
      var dist, vFOV, visibleHeight, visibleWidth;
      var xLimit, yLimit;
      var maxTargetZ = 200; //particle rotation

      var particleRotation;
      var centerVector = new THREE.Vector3(0, 0, 0);
      var previousTime = 0;

      function init() {
        //==================================
        //==================================
        //camera
        fieldOfView = 60;
        aspectRatio = windowWidth / windowHeight;
        nearPlane = 1; // the camera won't "see" any object placed in front of this plane

        farPlane = 10000; // the camera wont't see any object placed further than this plane 

        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0, 65, -500);
        camera.lookAt(centerVector); // convert the field of view to radians

        var ang = fieldOfView / 2 * Math.PI / 180; // calculate the max y position seen by the camera related to the maxTargetZ position, I start by calculating the y limit because fielOfView is a vertical field of view. I then calculate the x Limit

        yLimit = (camera.position.z + maxTargetZ) * Math.tan(ang); // this is a formula I found, don't ask me why it works, it just does :) 
        // Calculate the max x position seen by the camera related to the y Limit position

        xLimit = yLimit * camera.aspect; // Fit plane to screen

        dist = 1000;
        vFOV = THREE.Math.degToRad(camera.fov); // convert vertical fov to radians

        visibleHeight = 2 * Math.tan(vFOV / 2) * dist; // visible height

        visibleWidth = visibleHeight * camera.aspect; // visible width   
        //console.log( 'visibleWidth:' + visibleWidth + ', visibleHeight: ' + visibleHeight + ', xLimit: ' + xLimit + ', yLimit: ' + yLimit );
        //==================================
        //==================================
        //Scene

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(backgroundBg, 0.0025, 650); // Used to cover the light plane
        //==================================
        //==================================
        //Light from scene ready
        // Light plane  

        sceneForLightPlane = new THREE.Mesh(new THREE.CircleGeometry(1000, 32), new THREE.MeshPhongMaterial({
          emissive: backgroundPlane,
          side: THREE.DoubleSide
        }));
        sceneForLightPlane.receiveShadow = true;
        sceneForLightPlane.position.set(0, -101, 5);
        sceneForLightPlane.rotation.x = getRadian(-95);
        scene.add(sceneForLightPlane); // Spot Light

        var spotLightColor = 0xffffff,
            spotLightIntensity = 2,
            spotLightDistance = 1200,
            spotLightAngle = getRadian(50),
            spotLightPenumbra = 1,
            spotLightDecay = 1;
        sceneForSpotLight = new THREE.SpotLight(spotLightColor, spotLightIntensity, spotLightDistance, spotLightAngle, spotLightPenumbra, spotLightDecay);
        sceneForSpotLight.position.set(5, 320, 5); // Setting the y-axis bond angle is critical

        sceneForSpotLight.castShadow = true;
        sceneForSpotLight.shadow.mapSize.width = 1024;
        sceneForSpotLight.shadow.mapSize.height = 1024;
        sceneForSpotLight.shadow.camera.near = 0.5;
        sceneForSpotLight.shadow.camera.far = 31;
        scene.add(sceneForSpotLight); //console.log( sceneForSpotLight );

        /*
        const spotLightHelper = new THREE.SpotLightHelper( sceneForSpotLight );
        scene.add( spotLightHelper );   
        */
        // Ambient Light

        sceneForAmbientLight = new THREE.AmbientLight(0xffffff, 0.08);
        scene.add(sceneForAmbientLight); //==================================
        //==================================
        //WebGL Renderer		

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // instantiate a loader

        var loader = new THREE.TextureLoader(); // load a resource

        loader.load( // resource URL
        $('#' + rendererCanvasID).data('img-src'), // onLoad callback
        function (texture) {
          // in this example we create the material when the texture is loaded
          // Get data from an image
          imagedata = getImageData(texture.image); // Immediately use the texture for material creation

          var geometry = new THREE.Geometry();
          var material = new THREE.PointsMaterial({
            size: 3,
            color: 0xffffff,
            sizeAttenuation: false,
            fog: false //Excluding objects from fog

          });

          for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
            for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
              if (imagedata.data[x * 4 + y * 4 * imagedata.width + 3] > 128) {
                // The array of vertices holds the position of every vertex in the model.
                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * 1000 - 500;
                vertex.y = Math.random() * 1000 - 500;
                vertex.z = -Math.random() * 500;
                vertex.destination = {
                  x: x - imagedata.width / 2,
                  y: -y + imagedata.height / 2,
                  z: 0
                };
                vertex.speed = Math.random() / 200 + 0.015;
                geometry.vertices.push(vertex);
              }
            }
          }

          particles = new THREE.Points(geometry, material);
          scene.add(particles);
          particles.scale.setScalar(0.7);
          particles.position.y = 50;
          particles.position.z = 70;
          particles.rotation.y = getRadian(180); // set castShadow to object

          particles.castShadow = true;
        }, // onProgress callback currently not supported
        undefined, // onError callback
        function (err) {
          console.error('An error happened.');
        }); // add particle rotation

        particleRotation = new THREE.Object3D();
        scene.add(particleRotation);
        var geometryPR = new THREE.TetrahedronGeometry(2, 0),
            materialPR = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          shininess: 80,
          flatShading: true
        });

        for (var i = 0; i < 750; i++) {
          var mesh = new THREE.Mesh(geometryPR, materialPR);
          mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
          mesh.position.multiplyScalar(90 + Math.random() * 700);
          mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
          particleRotation.add(mesh); // set castShadow to object

          mesh.castShadow = true;
        } //----


        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, browser.supportsPassive ? {
          passive: true
        } : false);
        document.addEventListener('touchmove', onDocumentTouchMove, browser.supportsPassive ? {
          passive: true
        } : false);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
      }

      function render() {
        requestAnimationFrame(render);
        var delta = clock.getDelta(),
            thickness = 40; //---
        // 
        // To set a background color.

        renderer.setClearColor(backgroundBg); //---
        // 
        //Need to add judgment to avoid Cannot read property 'geometry' of undefined

        if (simple_3D_particle_effect_js_typeof(particles) != ( true ? "undefined" : undefined)) {
          var particle;

          for (var i = 0, j = particles.geometry.vertices.length; i < j; i++) {
            particle = particles.geometry.vertices[i];
            particle.x += (particle.destination.x - particle.x) * particle.speed;
            particle.y += (particle.destination.y - particle.y) * particle.speed;
            particle.z += (particle.destination.z - particle.z) * particle.speed;
          }

          if (delta - previousTime > thickness) {
            var index = Math.floor(Math.random() * particles.geometry.vertices.length);
            var particle1 = particles.geometry.vertices[index];
            var particle2 = particles.geometry.vertices[particles.geometry.vertices.length - index];
            TweenMax.to(particle, Math.random() * 2 + 1, {
              x: particle2.x,
              y: particle2.y,
              ease: Power2.easeInOut
            });
            TweenMax.to(particle2, Math.random() * 2 + 1, {
              x: particle1.x,
              y: particle1.y,
              ease: Power2.easeInOut
            });
            previousTime = delta;
          }

          particles.geometry.verticesNeedUpdate = true;
        }

        if (!isMouseDown) {
          camera.position.x += (0 - camera.position.x) * 0.06;
          camera.position.y += (0 - camera.position.y) * 0.06;
        }

        camera.position.x += (mouseX - camera.position.x) * 0.09;
        camera.position.y += (-mouseY - camera.position.y) * 0.09;
        if (camera.position.y < -60) camera.position.y = -60;
        camera.lookAt(centerVector); //particle rotation

        particleRotation.rotation.x += 0.0000;
        particleRotation.rotation.y -= 0.0040; //---
        // 
        //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var _i = 0; _i < sceneSubjects.length; _i++) {
          sceneSubjects[_i].update(clock.getElapsedTime() * 1);
        } //---
        // 
        //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

        if (isMouseDown) {
          camera.position.x += (event.clientX - lastMousePos.x) / 100;
          camera.position.y -= (event.clientY - lastMousePos.y) / 100;
          camera.lookAt(centerVector);
          lastMousePos = {
            x: event.clientX,
            y: event.clientY
          };
        }
      }

      function onDocumentTouchStart(event) {
        if (event.touches.length == 1) {
          event.preventDefault();
          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY;
        }
      }

      function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
          event.preventDefault();
          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY;
        }
      }

      function onDocumentMouseUp() {
        isMouseDown = false;
      }

      function onDocumentMouseDown(event) {
        isMouseDown = true;
        lastMousePos = {
          x: event.clientX,
          y: event.clientY
        };
      }
      /*
       * Get Image Data when Draw Image To Canvas
       *
       * @param  {!Element} image         - Overridden with a record type holding data, width and height.
       * @return {Object}                 - The image data via JSON.
       */


      function getImageData(image) {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0, 0, image.width, image.height);
      }
      /*
       * Get Object Coordinate, Width and Height From Screen
       * Note: No data may be acquired without delay !!
       *
      * @param  {THREE.Mesh} obj                           - Mesh object.
       * @param  {THREE.PerspectiveCamera} camera           - Mesh object.
      * @param  {Number} rendererWidth                     - Width of renderer.
       * @param  {Number} rendererHeight                    - Height of renderer.
       * @param  {String} type                              - Build type.
       * @return {JSON}
       */

      /* @usage: 
         const screenPos = nestedObjectToScreenXYZAndWH( displacementSprite , camera, renderer.domElement.width, renderer.domElement.height );
        */


      function nestedObjectToScreenXYZAndWH(obj, camera, rendererWidth, rendererHeight) {
        var vector = new THREE.Vector3();
        vector.setFromMatrixPosition(obj.matrixWorld);
        var widthHalf = rendererWidth / 2;
        var heightHalf = rendererHeight / 2;
        var aspect = rendererHeight / rendererWidth;
        vector.project(camera);
        vector.x = vector.x * widthHalf + widthHalf;
        vector.y = -(vector.y * heightHalf) + heightHalf; //compute bounding box after

        var boxInfo = new THREE.Box3().setFromObject(obj).getSize(new THREE.Vector3()); //Change it to fit the width and height of the stage based on the current value

        var ratioFixedNum = 7; //correction

        return {
          position: vector,
          width: (boxInfo.x * ratioFixedNum * aspect).toFixed(2),
          height: (boxInfo.y * ratioFixedNum * aspect).toFixed(2)
        };
      }
      /*
       * Generate random number between two numbers
       *
       * @return {Number}
       */


      function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
      }
      /*
       * Returns the degree from radian.
       *
       * @return {Number} rad - Value of radian.
       * @return {Number}
       * @usage: 
       
         angle = rad / ( Math.PI / 180 )  = rad * ( 180/Math.PI );
       */


      function getDegree(rad) {
        return rad / Math.PI * 180;
      }
      /*
       * Returns the radian degree .
       *
       * @return {Number} deg - Value of degree.
       * @return {Number}
       * @usage: 
          
          rad = Math.PI / 180 * 30 ;
       */


      function getRadian(deg) {
        return deg * Math.PI / 180;
      }
      /*
       * Convert three.js scene rotation to polar coordinates
       *
       * @return {Number} deg - Value of degree.
       * @return {Number}
       * @usage: 
       
          x = r * cos（θ）
          y = r * sin（θ）  
       */


      function getPolarCoord(x, y, z) {
        var nx = Math.cos(x) * Math.cos(y) * z,
            nz = Math.cos(x) * Math.sin(y) * z,
            ny = Math.sin(x) * z;
        return new THREE.Vector3(nx, ny, nz);
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_PARTICLE.documentReady);
  return function THREE_PARTICLE() {
    simple_3D_particle_effect_js_classCallCheck(this, THREE_PARTICLE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-sphere-three/js/index.js
function simple_3D_sphere_three_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Sphere Rotation -->
 *************************************
 */

/**
 * module.THREE_SPHERE_THREE
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_SPHERE_THREE = function (module, $, window, document) {
  if (window.THREE_SPHERE_THREE === null) return false;
  module.THREE_SPHERE_THREE = module.THREE_SPHERE_THREE || {};
  module.THREE_SPHERE_THREE.version = '0.0.2';

  module.THREE_SPHERE_THREE.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-sphere-three-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-sphere-three-canvas'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera, controls, scene, light, renderer, displacementSprite;

      function init() {
        // camera
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(0, -46, 18); // controls

        controls = new THREE.OrbitControls(camera);
        controls.minDistance = 10;
        controls.maxDistance = 50; //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        scene.add(light); //WebGL Renderer		

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight); // axes
        //scene.add( new THREE.AxisHelper( 20 ) );
        // geometry

        var geometry = new THREE.SphereGeometry(3, 32, 32); // material, we create the material when the texture is loaded

        var loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';
        var texture = loader.load('https://placekitten.com/1650/1650'),
            material = new THREE.MeshBasicMaterial({
          map: texture
        }); // parent

        displacementSprite = new THREE.Object3D();
        scene.add(displacementSprite); // pivots

        var pivot1 = new THREE.Object3D(),
            pivot2 = new THREE.Object3D(),
            pivot3 = new THREE.Object3D();
        pivot1.rotation.z = 0;
        pivot2.rotation.z = 2 * Math.PI / 3;
        pivot3.rotation.z = 4 * Math.PI / 3;
        displacementSprite.add(pivot1);
        displacementSprite.add(pivot2);
        displacementSprite.add(pivot3); // mesh

        var mesh1 = new THREE.Mesh(geometry, material),
            mesh2 = new THREE.Mesh(geometry, material),
            mesh3 = new THREE.Mesh(geometry, material);
        mesh1.position.y = 5;
        mesh2.position.y = 15;
        mesh3.position.y = 25;
        pivot1.add(mesh1);
        pivot2.add(mesh2);
        pivot3.add(mesh3); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
      }

      function render() {
        requestAnimationFrame(render);
        displacementSprite.rotation.z += 0.01; //update camera and controls

        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_SPHERE_THREE.documentReady);
  return function THREE_SPHERE_THREE() {
    simple_3D_sphere_three_js_classCallCheck(this, THREE_SPHERE_THREE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-obj-anim-interaction/js/index.js
function simple_3D_obj_anim_interaction_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Object Anim When Click -->
 *************************************
 */

/**
 * module.THREE_OBJ_ANIM_INTERACTION
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_OBJ_ANIM_INTERACTION = function (module, $, window, document) {
  if (window.THREE_OBJ_ANIM_INTERACTION === null) return false;
  module.THREE_OBJ_ANIM_INTERACTION = module.THREE_OBJ_ANIM_INTERACTION || {};
  module.THREE_OBJ_ANIM_INTERACTION.version = '0.0.3';

  module.THREE_OBJ_ANIM_INTERACTION.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-object-buttonevent-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-object-buttonevent-canvas';
      var renderer, scene, controls, camera, targetObj, parent, material, segLength;
      var radius = 3,
          height = 6,
          segments = 200; //segments must be even

      function init() {
        // Create a camera, which defines where we're looking at.		
        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight); //Scene

        scene = new THREE.Scene(); //camera

        camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight, 1, 100);
        camera.position.set(1, 1, 22); //controls

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', function () {
          renderer.render(scene, camera);
        }, false);
        controls.enableZoom = false;
        controls.enablePan = false; // Immediately use the texture for material creation

        material = new THREE.MeshPhongMaterial({
          color: 0xEB6D35,
          specular: 0xEB6D35,
          shininess: 15,
          flatShading: THREE.FlatShading,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: .8
        }); //HemisphereLight

        var light1 = new THREE.DirectionalLight(0xffffff);
        light1.position.set(-5, 10, 10);
        var light2 = new THREE.PointLight(0xffffff, .7, 0);
        light2.position.set(5, 5, -5);
        scene.add(light1, light2); //put the target object inside a parent object so the manipulation is easier

        parent = new THREE.Object3D();
        addObject();
        parent.position.set(-radius, height / 2, 0);
        parent.rotation.y = Math.PI;
        scene.add(parent);
        renderer.render(scene, camera);
      }

      function addObject() {
        var geo = new THREE.Geometry();
        segLength = Math.PI * 2 * radius / segments;
        geo.vertices.push(new THREE.Vector3(0, height / 2, 0));
        geo.vertices.push(new THREE.Vector3(0, -height / 2, 0));

        for (var i = 0; i < Math.floor(segments / 2); i++) {
          geo.vertices.push(new THREE.Vector3(0, height / 2, segLength * i));
          geo.vertices.push(new THREE.Vector3(0, -height / 2, segLength * i));
          geo.vertices.push(new THREE.Vector3(0, height / 2, -segLength * i));
          geo.vertices.push(new THREE.Vector3(0, -height / 2, -segLength * i));
        }

        geo.faces.push(new THREE.Face3(0, 1, 2));
        geo.faces.push(new THREE.Face3(1, 2, 3));
        geo.faces.push(new THREE.Face3(0, 1, 4));
        geo.faces.push(new THREE.Face3(1, 4, 5));

        for (var _i = 1; _i < Math.floor(segments / 2); _i++) {
          geo.faces.push(new THREE.Face3(2 + (_i - 1) * 4, 3 + (_i - 1) * 4, 6 + (_i - 1) * 4));
          geo.faces.push(new THREE.Face3(3 + (_i - 1) * 4, 6 + (_i - 1) * 4, 7 + (_i - 1) * 4));
          geo.faces.push(new THREE.Face3(4 + (_i - 1) * 4, 5 + (_i - 1) * 4, 8 + (_i - 1) * 4));
          geo.faces.push(new THREE.Face3(5 + (_i - 1) * 4, 8 + (_i - 1) * 4, 9 + (_i - 1) * 4));
        }

        targetObj = new THREE.Mesh(geo, material);
        parent.add(targetObj);
      }

      function render() {
        requestAnimationFrame(render); //upodate object

        targetObj.geometry.verticesNeedUpdate = true; //update camera and controls

        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      $('#3D-object-button1').on('click', function (e) {
        e.preventDefault();
        var theta = 55,
            x = camera.position.x,
            z = camera.position.z,
            moveX = x * Math.cos(theta) - z * Math.sin(theta),
            moveZ = z * Math.cos(theta) + x * Math.sin(theta);
        TweenMax.to(camera.position, 1.5, {
          x: moveX,
          z: moveZ,
          ease: Power0.easeNone,
          onUpdate: function onUpdate() {}
        });
      });
      $('#3D-object-button2').on('click', function (e) {
        e.preventDefault(); //1. tween the first segment of each side

        var w = targetObj.geometry.vertices;
        w[2].x = w[3].x = w[4].x = w[5].x = -Math.sin(0) * segLength;
        w[2].z = w[3].z = Math.cos(0) * segLength;
        w[4].z = w[5].z = -Math.cos(0) * segLength; //2. rest of the vertex can now refer to the fourth previous vertex, their reference in the algorithm

        for (var i = 6; i < w.length; i++) {
          //which segment from the origin the vertex belongs to
          var vIndex = i,
              segIndex = Math.floor((vIndex + 2) / 4),
              negate = vIndex / 4 === Math.floor(vIndex / 4) || (vIndex - 1) / 4 === Math.floor((vIndex - 1) / 4) ? -1 : 1;
          var tx = w[vIndex - 4].x - Math.sin(vIndex * (negate * (2 * segIndex - 1))) * segLength * negate;
          var tz = w[vIndex - 4].z + Math.cos(vIndex * (negate * (2 * segIndex - 1))) * segLength * negate;
          TweenMax.to(w[vIndex], 1.5, {
            x: tx,
            z: tz,
            ease: Power0.easeNone,
            onUpdate: function onUpdate() {}
          });
        }
      });
      $('#3D-object-button3').on('click', function (e) {
        e.preventDefault();
        var scaleTo = Math.floor(Math.random() * Math.floor(3));
        TweenMax.to(targetObj.scale, 1.5, {
          x: scaleTo,
          y: scaleTo,
          z: scaleTo,
          ease: Power0.easeNone,
          onUpdate: function onUpdate() {}
        });
      }); // 
      //-------------------------------------	

      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_OBJ_ANIM_INTERACTION.documentReady);
  return function THREE_OBJ_ANIM_INTERACTION() {
    simple_3D_obj_anim_interaction_js_classCallCheck(this, THREE_OBJ_ANIM_INTERACTION);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-mouse-interaction/js/index.js
function simple_3D_mouse_interaction_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Mouse Interaction with three.js -->
 *************************************
 */

/**
 * module.THREE_MOUSE_INTERACTION
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_MOUSE_INTERACTION = function (module, $, window, document) {
  if (window.THREE_MOUSE_INTERACTION === null) return false;
  module.THREE_MOUSE_INTERACTION = module.THREE_MOUSE_INTERACTION || {};
  module.THREE_MOUSE_INTERACTION.version = '0.0.3';

  module.THREE_MOUSE_INTERACTION.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-mouseinteraction-three-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-mouseinteraction-three-canvas'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          controls,
          scene,
          light,
          renderer,
          displacementSprite,
          radius = 100,
          theta = 0,
          clickEnable = false;
      var mouseVector = new THREE.Vector2();
      var raycaster,
          intersects,
          INTERSECTED,
          nucleus,
          atoms = [];

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 1, 10000);
        camera.position.set(0, 0, 1300); //controls

        controls = new THREE.OrbitControls(camera);
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.5;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.enableZoom = true;
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 100;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(30, 167, 81);
        controls.update(); //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        scene.add(light); //WebGL Renderer	

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight); // Immediately use the texture for material creation

        generateGeometry('poly', 15); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false); // When the mouse moves, call the given function

        raycaster = new THREE.Raycaster();
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.getElementById(rendererCanvasID).addEventListener('click', onDocumentMouseDown, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
      }

      function render() {
        requestAnimationFrame(render);
        theta += 0.1; //To set a background color.

        renderer.setClearColor(0x000000); //Mouse interactions

        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects(atoms); //intersects = raycaster.intersectObjects( scene.children );

        if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
            // restore previous intersection object (if it exists) to its original color
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
          }
        } else {
          // restore previous intersection object (if it exists) to its original color
          if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex); //by setting current intersection object to "nothing"

          INTERSECTED = null;
        } //update camera and controls


        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseMove(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      function onDocumentMouseDown(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        clickEnable = true; //Mouse interactions

        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects(atoms); //intersects = raycaster.intersectObjects( scene.children );

        if (intersects.length > 0 && intersects[0].object.name.indexOf('nucleus') >= 0) {
          var _obj = intersects[0].object;
          console.log(_obj.name); //---Change object size
          //				if ( typeof intersects[ 0 ] != typeof undefined ) {
          //					const obj = intersects[ 0 ].object;
          //
          //
          //					TweenMax.to( obj.scale, 1, {
          //						x: '+=' + ( 200 - obj.scale.x ) * 0.05,
          //						y: '+=' + ( 200 - obj.scale.y ) * 0.05,
          //						z: '+=' + ( 200 - obj.scale.z ) * 0.05
          //					});	
          //
          //
          //					obj.updateMatrix();	
          //	
          //				}
          //---Change object position

          var targetAtomPos = _obj.position;
          console.log(targetAtomPos); // targetAtomPos.tween.pause();

          var destinationPos = targetAtomPos.clone();
          TweenMax.to(controls.target, 2, {
            x: destinationPos.x,
            y: destinationPos.y,
            z: destinationPos.z
          });
          TweenMax.to(camera.position, 2, {
            x: destinationPos.x,
            y: destinationPos.y,
            z: destinationPos.z + 100,
            onUpdate: function onUpdate() {
              camera.up.set(0, 1, 0);
              camera.updateProjectionMatrix();
            },
            onComplete: function onComplete() {
              // get object new coordinates
              var screenData = nestedObjectToScreenXYZAndWH(_obj, camera, renderer.domElement.width, renderer.domElement.height);
              console.log("Current object coordinates: {x: ".concat(screenData.position.x, ", y: ").concat(screenData.position.y, ", z: ").concat(screenData.position.z, " }"));
            }
          });
        } else {
          //Change object position
          TweenMax.to(controls.target, 2, {
            x: 0,
            y: 0,
            z: 0,
            onComplete: function onComplete() {
              TweenMax.resumeAll();
            }
          });
        }
      }

      function onDocumentMouseUp(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        theta = 0;
        clickEnable = false;
      }
      /*
       * Batch generation of geometry
       *
       * @param  {String} objectType     - String of geometry type identifier.
       * @param  {Number} numObjects       - The total number of generated objects.
       * @return {Void}
       */


      function generateGeometry(objectType, numObjects) {
        //set color
        var applyVertexColors = function applyVertexColors(g, c) {
          g.faces.forEach(function (f) {
            var n = f instanceof THREE.Face3 ? 3 : 4;

            for (var j = 0; j < n; j++) {
              f.vertexColors[j] = c;
            }
          });
        };

        for (var i = 0; i < numObjects; i++) {
          var geometry = void 0;

          if (objectType == "cube") {
            geometry = new THREE.BoxGeometry(1, 1, 1);
          } else if (objectType == "sphere") {
            geometry = new THREE.IcosahedronGeometry(1, 1);
          } else if (objectType == "poly") {
            geometry = new THREE.CylinderGeometry(3, 6, 3, 5, 1);
          }

          var position = new THREE.Vector3();
          position.x = Math.random() * 500;
          position.y = Math.random() * 400;
          position.z = Math.random() * 300;
          var rotation = new THREE.Euler();
          rotation.x = Math.random() * 2 * Math.PI;
          rotation.y = Math.random() * 2 * Math.PI;
          rotation.z = Math.random() * 2 * Math.PI;
          var scale = new THREE.Vector3(); // give the geom's vertices a random color, to be displayed

          var color = new THREE.Color();
          color.setRGB(Math.random(), Math.random(), Math.random());
          applyVertexColors(geometry, color); // Immediately use the texture for material creation

          var defaultMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true,
            vertexColors: THREE.VertexColors
          });
          displacementSprite = new THREE.Mesh(geometry, defaultMaterial);
          displacementSprite.name = 'nucleus-' + i;
          displacementSprite.position.x = Math.random() * 800 - 400;
          displacementSprite.position.y = Math.random() * 800 - 400;
          displacementSprite.position.z = Math.random() * 800 - 400;
          displacementSprite.rotation.x = Math.random() * 2 * Math.PI;
          displacementSprite.rotation.y = Math.random() * 2 * Math.PI;
          displacementSprite.rotation.z = Math.random() * 2 * Math.PI;
          displacementSprite.scale.x = Math.random() + 5;
          displacementSprite.scale.y = Math.random() + 5;
          displacementSprite.scale.z = Math.random() + 5;
          scene.add(displacementSprite);
          atoms.push(displacementSprite);
        }
      }
      /*
       * Get Object Coordinate, Width and Height From Screen
       * Note: No data may be acquired without delay !!
       *
      * @param  {THREE.Mesh} obj                           - Mesh object.
       * @param  {THREE.PerspectiveCamera} camera           - Mesh object.
      * @param  {Number} rendererWidth                     - Width of renderer.
       * @param  {Number} rendererHeight                    - Height of renderer.
       * @param  {String} type                              - Build type.
       * @return {JSON}
       */

      /* @usage: 
         const screenPos = nestedObjectToScreenXYZAndWH( displacementSprite , camera, renderer.domElement.width, renderer.domElement.height );
        */


      function nestedObjectToScreenXYZAndWH(obj, camera, rendererWidth, rendererHeight) {
        var vector = new THREE.Vector3();
        vector.setFromMatrixPosition(obj.matrixWorld);
        var widthHalf = rendererWidth / 2;
        var heightHalf = rendererHeight / 2;
        var aspect = rendererHeight / rendererWidth;
        vector.project(camera);
        vector.x = vector.x * widthHalf + widthHalf;
        vector.y = -(vector.y * heightHalf) + heightHalf; //compute bounding box after

        var boxInfo = new THREE.Box3().setFromObject(obj).getSize(new THREE.Vector3()); //Change it to fit the width and height of the stage based on the current value

        var ratioFixedNum = 7; //correction

        return {
          position: vector,
          width: (boxInfo.x * ratioFixedNum * aspect).toFixed(2),
          height: (boxInfo.y * ratioFixedNum * aspect).toFixed(2)
        };
      }
      /*
       * Generate random number between two numbers
       *
       * @return {Number}
       */


      function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
      }
      /*
       * Returns the degree from radian.
       *
       * @return {Number} rad - Value of radian.
       * @return {Number}
       * @usage: 
       
         angle = rad / ( Math.PI / 180 )  = rad * ( 180/Math.PI );
       */


      function getDegree(rad) {
        return rad / Math.PI * 180;
      }
      /*
       * Returns the radian degree .
       *
       * @return {Number} deg - Value of degree.
       * @return {Number}
       * @usage: 
          
          rad = Math.PI / 180 * 30 ;
       */


      function getRadian(deg) {
        return deg * Math.PI / 180;
      }
      /*
       * Convert three.js scene rotation to polar coordinates
       *
       * @return {Number} deg - Value of degree.
       * @return {Number}
       * @usage: 
       
          x = r * cos（θ）
          y = r * sin（θ）  
       */


      function getPolarCoord(x, y, z) {
        var nx = Math.cos(x) * Math.cos(y) * z,
            nz = Math.cos(x) * Math.sin(y) * z,
            ny = Math.sin(x) * z;
        return new THREE.Vector3(nx, ny, nz);
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_MOUSE_INTERACTION.documentReady);
  return function THREE_MOUSE_INTERACTION() {
    simple_3D_mouse_interaction_js_classCallCheck(this, THREE_MOUSE_INTERACTION);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-mouse-interaction2/js/index.js
function simple_3D_mouse_interaction2_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Mouse Interaction with three.js -->
 *************************************
 */

/**
 * module.THREE_MOUSE_INTERACTION2
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_MOUSE_INTERACTION2 = function (module, $, window, document) {
  if (window.THREE_MOUSE_INTERACTION2 === null) return false;
  module.THREE_MOUSE_INTERACTION2 = module.THREE_MOUSE_INTERACTION2 || {};
  module.THREE_MOUSE_INTERACTION2.version = '0.0.5';

  module.THREE_MOUSE_INTERACTION2.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-mouseinteraction2-three-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-mouseinteraction2-three-canvas'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          scene,
          light,
          renderer,
          displacementSprite,
          theta = 0,
          clickEnable = false; // controls

      var scroller = new CameraScroller({
        direction: "y"
      }); // mouse

      var mouseVector = new THREE.Vector2();
      var raycaster,
          intersects,
          INTERSECTED,
          nucleus,
          atoms = [];

      function init() {
        //camera
        camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight, 1, 50000);
        camera.position.set(0, 0, 20000); //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        scene.add(light); //WebGL Renderer		

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight);
        scroller.init(renderer.domElement); // Immediately use the texture for material creation

        generateGeometry(500); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false); // When the mouse moves, call the given function

        raycaster = new THREE.Raycaster();
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.getElementById(rendererCanvasID).addEventListener('click', onDocumentMouseDown, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
      }

      function render() {
        requestAnimationFrame(render); //To set a background color.

        renderer.setClearColor(0x000000); //update controls

        camera.position.y = scroller.getScrollPosY() * 10000; //Mouse interactions

        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects(atoms); //intersects = raycaster.intersectObjects( scene.children );

        if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
            // restore previous intersection object (if it exists) to its original color
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
          }
        } else {
          // restore previous intersection object (if it exists) to its original color
          if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex); //by setting current intersection object to "nothing"

          INTERSECTED = null;
        } //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */


        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onDocumentMouseMove(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      function onDocumentMouseDown(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        clickEnable = true; //Mouse interactions

        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects(atoms); //intersects = raycaster.intersectObjects( scene.children );

        if (intersects.length > 0 && intersects[0].object.name.indexOf('nucleus') >= 0) {
          var _obj = intersects[0].object;
          var targetAtomPos = _obj.position;
          console.log(targetAtomPos); // targetAtomPos.tween.pause();

          var destinationPos = targetAtomPos.clone(); // jump to new position
          // y movement via scroller object
          // x and z movement via TWEEN

          scroller.targetPosition = _obj.position.y / 10000;
          var targetPos = {
            x: _obj.position.x,
            y: _obj.position.y,
            z: _obj.position.z + 1100
          };
          TweenMax.to(targetPos, 2, {
            x: destinationPos.x,
            y: destinationPos.y,
            z: destinationPos.z
          });
          TweenMax.to(camera.position, 2, {
            x: destinationPos.x,
            y: destinationPos.y,
            z: destinationPos.z + 1000,
            onUpdate: function onUpdate() {
              camera.up.set(0, 1, 0);
              camera.updateProjectionMatrix();
            },
            onComplete: function onComplete() {
              // get object new coordinates
              var screenData = nestedObjectToScreenXYZAndWH(_obj, camera, renderer.domElement.width, renderer.domElement.height);
              console.log("Current object coordinates: {x: ".concat(screenData.position.x, ", y: ").concat(screenData.position.y, ", z: ").concat(screenData.position.z, " }"));
            }
          });
        } else {
          //restore scroller position
          scroller.targetPosition = 0; //restore camera position

          TweenMax.to(camera.position, 2, {
            x: 0,
            y: 0,
            z: 20000,
            onComplete: function onComplete() {
              TweenMax.resumeAll();
            }
          });
        }
      }

      function onDocumentMouseUp(event) {
        event.preventDefault();
        mouseVector.x = event.clientX / window.innerWidth * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        theta = 0;
        clickEnable = false;
      }
      /*
       * Batch generation of geometry
       *
       * @param  {Number} numObjects       - The total number of generated objects.
       * @return {Void}
       */


      function generateGeometry(numObjects) {
        var geometry = new THREE.Geometry();

        var applyVertexColors = function applyVertexColors(g, c) {
          g.faces.forEach(function (f) {
            var n = f instanceof THREE.Face3 ? 3 : 4;

            for (var j = 0; j < n; j++) {
              f.vertexColors[j] = c;
            }
          });
        };

        for (var i = 0; i < numObjects; i++) {
          var geom = void 0;
          var color = new THREE.Color();
          var position = new THREE.Vector3();
          position.x = -9000 + i % 10 * 2000;
          position.y = -9000 + Math.floor(i % 100 / 10) * 2000;
          position.z = -1000 + Math.floor(i / 100) * 2000;
          var rotation = new THREE.Euler();
          rotation.x = 0;
          rotation.y = 0;
          rotation.z = 0;
          var scale = new THREE.Vector3();
          scale.x = 1200;
          scale.y = 600;
          scale.z = 200;
          geom = new THREE.BoxGeometry(1, 1, 1);
          color.setRGB(0, 0, Math.random() + 0.1); // give the geom's vertices a random color, to be displayed

          applyVertexColors(geom, color); // Immediately use the texture for material creation

          var defaultMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true,
            vertexColors: THREE.VertexColors
          });
          displacementSprite = new THREE.Mesh(geom, defaultMaterial);
          scene.add(displacementSprite);
          var object = new THREE.Mesh(geom);
          displacementSprite.name = 'nucleus-' + i;
          displacementSprite.position.copy(position);
          displacementSprite.rotation.copy(rotation);
          displacementSprite.scale.copy(scale);
          displacementSprite.updateMatrix();
          scene.add(displacementSprite);
          atoms.push(displacementSprite);
        }
      }
      /*
       * CameraSroller
       * Scrolls the camera vertically (up/down) by mouse, scrollwhell and touch
       * including a velocity based animation
       */


      function CameraScroller(options) {
        this.targetPosition = 0;
        this.targetPositionOnMouseDown = 0;
        this.mouseY = 0;
        this.mouseYOnMouseDown = 0;
        this.scrollPosY = 0;
        this.domElem = undefined;

        this.init = function (domEl) {
          this.domElem = domEl;
          this.domElem.addEventListener('mousedown', this.onDocumentMouseDown, false);
          this.domElem.addEventListener('touchstart', this.onDocumentTouchStart, browser.supportsPassive ? {
            passive: true
          } : false);
          this.domElem.addEventListener('touchmove', this.onDocumentTouchMove, browser.supportsPassive ? {
            passive: true
          } : false);
          this.domElem.addEventListener('wheel', this.onDocumentMousewheel, browser.supportsPassive ? {
            passive: true
          } : false);
        };

        this.onDocumentMouseDown = function (event) {
          event.preventDefault();
          this.domElem.addEventListener('mousemove', this.onDocumentMouseMove, false);
          this.domElem.addEventListener('mouseup', this.onDocumentMouseUp, false);
          this.domElem.addEventListener('mouseout', this.onDocumentMouseOut, false);
          this.mouseYOnMouseDown = event.clientY;
          this.targetPositionOnMouseDown = this.targetPosition;
        }.bind(this);

        this.onDocumentMouseMove = function (event) {
          this.mouseY = event.clientY;
          this.targetPosition = this.targetPositionOnMouseDown + (this.mouseY - this.mouseYOnMouseDown) * 0.02;
        }.bind(this);

        this.onDocumentMouseUp = function (event) {
          this.domElem.removeEventListener('mousemove', this.onDocumentMouseMove, false);
          this.domElem.removeEventListener('mouseup', this.onDocumentMouseUp, false);
          this.domElem.removeEventListener('mouseout', this.onDocumentMouseOut, false);
        }.bind(this);

        this.onDocumentMouseOut = function (event) {
          this.domElem.removeEventListener('mousemove', this.onDocumentMouseMove, false);
          this.domElem.removeEventListener('mouseup', this.onDocumentMouseUp, false);
          this.domElem.removeEventListener('mouseout', this.onDocumentMouseOut, false);
        }.bind(this);

        this.onDocumentTouchStart = function (event) {
          if (event.touches.length == 1) {
            event.preventDefault();
            this.mouseYOnMouseDown = event.touches[0].pageY;
            this.targetPositionOnMouseDown = this.targetPosition;
          }
        }.bind(this);

        this.onDocumentTouchMove = function (event) {
          if (event.touches.length == 1) {
            event.preventDefault();
            this.mouseY = event.touches[0].pageY;
            this.targetPosition = this.targetPositionOnMouseDown + (this.mouseY - this.mouseYOnMouseDown) * 0.02;
          }
        }.bind(this);

        this.onDocumentMousewheel = function (event) {
          this.targetPosition = this.targetPosition + event.wheelDeltaY * 0.005;
        }.bind(this);

        this.getScrollPosY = function () {
          this.scrollPosY = this.scrollPosY + (this.targetPosition - this.scrollPosY) * 0.05; // 0.05=long scroll delay, 0.15=short delay

          return this.scrollPosY;
        }.bind(this);
      }
      /*
       * Get Object Coordinate, Width and Height From Screen
       * Note: No data may be acquired without delay !!
       *
      * @param  {THREE.Mesh} obj                           - Mesh object.
       * @param  {THREE.PerspectiveCamera} camera           - Mesh object.
      * @param  {Number} rendererWidth                     - Width of renderer.
       * @param  {Number} rendererHeight                    - Height of renderer.
       * @param  {String} type                              - Build type.
       * @return {JSON}
       */

      /* @usage: 
         const screenPos = nestedObjectToScreenXYZAndWH( displacementSprite , camera, renderer.domElement.width, renderer.domElement.height );
        */


      function nestedObjectToScreenXYZAndWH(obj, camera, rendererWidth, rendererHeight) {
        var vector = new THREE.Vector3();
        vector.setFromMatrixPosition(obj.matrixWorld);
        var widthHalf = rendererWidth / 2;
        var heightHalf = rendererHeight / 2;
        var aspect = rendererHeight / rendererWidth;
        vector.project(camera);
        vector.x = vector.x * widthHalf + widthHalf;
        vector.y = -(vector.y * heightHalf) + heightHalf; //compute bounding box after

        var boxInfo = new THREE.Box3().setFromObject(obj).getSize(new THREE.Vector3()); //Change it to fit the width and height of the stage based on the current value

        var ratioFixedNum = 7; //correction

        return {
          position: vector,
          width: (boxInfo.x * ratioFixedNum * aspect).toFixed(2),
          height: (boxInfo.y * ratioFixedNum * aspect).toFixed(2)
        };
      }
      /*
       * Generate random number between two numbers
       *
       * @return {Number}
       */


      function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
      }
      /*
       * Returns the degree from radian.
       *
       * @return {Number} rad - Value of radian.
       * @return {Number}
       * @usage: 
       
         angle = rad / ( Math.PI / 180 )  = rad * ( 180/Math.PI );
       */


      function getDegree(rad) {
        return rad / Math.PI * 180;
      }
      /*
       * Returns the radian degree .
       *
       * @return {Number} deg - Value of degree.
       * @return {Number}
       * @usage: 
          
          rad = Math.PI / 180 * 30 ;
       */


      function getRadian(deg) {
        return deg * Math.PI / 180;
      }
      /*
       * Convert three.js scene rotation to polar coordinates
       *
       * @return {Number} deg - Value of degree.
       * @return {Number}
       * @usage: 
       
          x = r * cos（θ）
          y = r * sin（θ）  
       */


      function getPolarCoord(x, y, z) {
        var nx = Math.cos(x) * Math.cos(y) * z,
            nz = Math.cos(x) * Math.sin(y) * z,
            ny = Math.sin(x) * z;
        return new THREE.Vector3(nx, ny, nz);
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_MOUSE_INTERACTION2.documentReady);
  return function THREE_MOUSE_INTERACTION2() {
    simple_3D_mouse_interaction2_js_classCallCheck(this, THREE_MOUSE_INTERACTION2);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/simple-3D-shatter-slider/scss/_style.scss
var simple_3D_shatter_slider_scss_style = __webpack_require__(60);

// CONCATENATED MODULE: ./src/components/ES6/simple-3D-shatter-slider/js/index.js
function simple_3D_shatter_slider_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple_3D_shatter_slider_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { simple_3D_shatter_slider_js_typeof = function _typeof(obj) { return typeof obj; }; } else { simple_3D_shatter_slider_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return simple_3D_shatter_slider_js_typeof(obj); }

/* 
 *************************************
 * <!-- 3D Shatter Slider -->
 *************************************
 */

/**
 * module.THREE_SHATTER_SLIDER
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */


var THREE_SHATTER_SLIDER = function (module, $, window, document) {
  if (window.THREE_SHATTER_SLIDER === null) return false;
  module.THREE_SHATTER_SLIDER = module.THREE_SHATTER_SLIDER || {};
  module.THREE_SHATTER_SLIDER.version = '0.0.7';

  module.THREE_SHATTER_SLIDER.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('.uix-3d-slider--shatter').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var $sliderWrapper = $('.uix-3d-slider--shatter'),
          //Basic webGL renderers 
      renderLoaderID = 'uix-3d-slider--shatter__loader',
          rendererOuterID = 'uix-3d-slider--shatter__canvas-container',
          rendererCanvasID = 'uix-3d-slider--shatter__canvas';
      var animSpeed = 1000; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          controls,
          scene,
          light,
          renderer,
          material,
          displacementSprite,
          theta = 0;
      var offsetWidth = 475,
          //Set the display width of the objects in the Stage
      offsetHeight = 375,
          //Set the display height of the objects in the Stage
      allSources = [],
          objTotal,
          objLoaded = false;
      var sources = [];
      var isAnimating = false; // constants

      var activeSlider = 0;

      function wrapperInit() {
        $sliderWrapper.each(function () {
          var $this = $(this);
          var $items = $this.find('.uix-3d-slider--shatter__item'),
              $first = $items.first(),
              itemsTotal = $items.length,
              activated = $this.data('activated');

          if (simple_3D_shatter_slider_js_typeof(activated) === ( true ? "undefined" : undefined) || activated === 0) {
            //Get parameter configuration from the data-* attribute of HTML
            var dataControlsPagination = $this.data('controls-pagination'),
                dataControlsArrows = $this.data('controls-arrows'),
                dataLoop = $this.data('loop'),
                dataFilterTexture = $this.data('filter-texture'),
                dataDraggable = $this.data('draggable'),
                dataDraggableCursor = $this.data('draggable-cursor'),
                dataSpeed = $this.data('speed'),
                dataAuto = $this.data('auto'),
                dataTiming = $this.data('timing'),
                dataCountTotal = $this.data('count-total'),
                dataCountCur = $this.data('count-now');
            if (simple_3D_shatter_slider_js_typeof(dataControlsPagination) === ( true ? "undefined" : undefined)) dataControlsPagination = '.uix-3d-slider--shatter__pagination';
            if (simple_3D_shatter_slider_js_typeof(dataControlsArrows) === ( true ? "undefined" : undefined) || dataControlsArrows == false) dataControlsArrows = '.uix-3d-slider--shatter__arrows';
            if (simple_3D_shatter_slider_js_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = false;
            if (simple_3D_shatter_slider_js_typeof(dataFilterTexture) === ( true ? "undefined" : undefined) || !dataFilterTexture || dataFilterTexture == '') dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            if (simple_3D_shatter_slider_js_typeof(dataDraggable) === ( true ? "undefined" : undefined)) dataDraggable = false;
            if (simple_3D_shatter_slider_js_typeof(dataDraggableCursor) === ( true ? "undefined" : undefined)) dataDraggableCursor = 'move';
            if (simple_3D_shatter_slider_js_typeof(dataAuto) === ( true ? "undefined" : undefined)) dataAuto = false;
            if (simple_3D_shatter_slider_js_typeof(dataTiming) === ( true ? "undefined" : undefined)) dataTiming = 10000;
            if (simple_3D_shatter_slider_js_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = false; //Autoplay times

            var playTimes; //A function called "timer" once every second (like a digital watch).

            $this[0].animatedSlides; //If arrows does not exist on the page, it will be added by default, 
            //and the drag and drop function will be activated.

            if ($(dataControlsArrows).length == 0) {
              $('body').prepend('<div style="display:none;" class="uix-3d-slider--shatter__arrows ' + dataControlsArrows.replace('#', '').replace('.', '') + '"><a href="#" class="uix-3d-slider--shatter__arrows--prev"></a><a href="#" class="uix-3d-slider--shatter__arrows--next"></a></div>');
            } //Prevent bubbling


            if (itemsTotal == 1) {
              $(dataControlsPagination).hide();
              $(dataControlsArrows).hide();
            } //Initialize the controlers classes
            //-------------------------------------	


            $(dataControlsPagination).find('ul > li').first().addClass('is-active'); //Initialize the wrapper width and height
            //-------------------------------------	

            $this.css('height', windowHeight + 'px'); //Load slides to canvas
            //-------------------------------------	

            if ($('#' + rendererCanvasID).length == 0) {
              $this.prepend('<div id="' + rendererOuterID + '" class="uix-3d-slider--shatter__canvas-container"><canvas id="' + rendererCanvasID + '"></canvas></div>');
            } //Get the animation speed
            //-------------------------------------	


            if (simple_3D_shatter_slider_js_typeof(dataSpeed) != ( true ? "undefined" : undefined) && dataSpeed != false) {
              animSpeed = dataSpeed;
            } //Initialize the first item container
            //-------------------------------------		


            $items.addClass('next');
            $first.addClass('is-active'); //Add identifiers for the first and last items
            //-------------------------------------		

            $items.last().addClass('last');
            $items.first().addClass('first'); //Get all images and videos
            //-------------------------------------		

            $items.each(function () {
              var _item = $(this);

              if (_item.find('video').length > 0) {
                //Returns the dimensions (intrinsic height and width ) of the video
                var video = document.getElementById(_item.find('video').attr('id'));

                var videoURL = _item.find('source:first').attr('src');

                if (simple_3D_shatter_slider_js_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = _item.attr('src');

                if (simple_3D_shatter_slider_js_typeof(videoURL) != ( true ? "undefined" : undefined)) {
                  sources.push({
                    "url": videoURL,
                    "id": _item.find('video').attr('id'),
                    "type": 'video'
                  });
                }
              } else {
                var imgURL = _item.find('img').attr('src');

                if (simple_3D_shatter_slider_js_typeof(imgURL) != ( true ? "undefined" : undefined)) {
                  sources.push({
                    "url": imgURL,
                    "id": 'img-' + UixGUID.create(),
                    "type": 'img'
                  });
                }
              }
            }); //Pagination dots 
            //-------------------------------------	

            var _dot = '',
                _dotActive = '';
            _dot += '<ul>';

            for (var i = 0; i < itemsTotal; i++) {
              _dotActive = i == 0 ? 'class="is-active"' : '';
              _dot += '<li ' + _dotActive + ' data-index="' + i + '"><a href="javascript:"></a></li>';
            }

            _dot += '</ul>';
            if ($(dataControlsPagination).html() == '') $(dataControlsPagination).html(_dot); //Fire the slider transtion with buttons

            $(dataControlsPagination).find('ul > li').off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              var $btn = $(this);
              if ($btn.attr('aria-disabled') == 'true') return false;
              $(dataControlsPagination).find('ul > li').attr('aria-disabled', 'true');
              setTimeout(function () {
                $(dataControlsPagination).find('ul > li').attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $(dataControlsPagination).find('ul > li.is-active').index(),
                  slideNextId = $(this).index(); //Determine the direction

              var curDir = 'prev';

              if ($(this).attr('data-index') > slideCurId) {
                curDir = 'next';
              } //Transition Between Slides


              sliderUpdates(slideCurId, slideNextId, curDir, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }); //Next/Prev buttons
            //-------------------------------------		

            var _prev = $(dataControlsArrows).find('.uix-3d-slider--shatter__arrows--prev'),
                _next = $(dataControlsArrows).find('.uix-3d-slider--shatter__arrows--next');

            $(dataControlsArrows).find('a').attr('href', 'javascript:');
            $(dataControlsArrows).find('a').removeClass('is-disabled');

            if (!dataLoop) {
              _prev.addClass('is-disabled');
            }

            _prev.off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              if (_prev.attr('aria-disabled') == 'true') return false;

              _prev.attr('aria-disabled', 'true');

              setTimeout(function () {
                _prev.attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $items.filter('.is-active').index(),
                  slideNextId = parseFloat($items.filter('.is-active').index()) - 1; //Transition Between Slides

              sliderUpdates(slideCurId, slideNextId, 'prev', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            });

            _next.off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              if (_next.attr('aria-disabled') == 'true') return false;

              _next.attr('aria-disabled', 'true');

              setTimeout(function () {
                _next.attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $items.filter('.is-active').index(),
                  slideNextId = parseFloat($items.filter('.is-active').index()) + 1; //Transition Between Slides

              sliderUpdates(slideCurId, slideNextId, 'next', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }); //Autoplay Slider
            //-------------------------------------		


            if (dataAuto && !isNaN(parseFloat(dataTiming)) && isFinite(dataTiming)) {
              sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              $this.on({
                mouseenter: function mouseenter() {
                  clearInterval($this[0].animatedSlides);
                },
                mouseleave: function mouseleave() {
                  sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
                }
              });
            } //Prevents front-end javascripts that are activated with AJAX to repeat loading.


            $this.data('activated', 1);
          } //endif activated

        }); // end each				
      }

      function init() {
        //Core 3D stage begin
        //-------------------------------------		
        //camera
        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 10, 2500); // FlyCamera // FlyControls

        camera.movementSpeed = 100.0;
        camera.rollSpeed = 0.5;
        camera.position.y = 60;
        camera.position.z = 500; //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 0, 2000);
        scene.add(light); //WebGL Renderer	
        // create a render and set the size

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight); //controls

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.5;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.enableZoom = false;
        controls.target.set(0, 0, 0);
        controls.update(); //A loader for loading all images from array.

        var loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous'; //Preload

        objTotal = sources.length;
        sources.forEach(function (element, index) {
          if (element.type == 'img') {
            loader.load( // resource URL
            element.url, // onLoad callback
            function (texture) {
              loadSource(texture, index, offsetWidth, offsetHeight, objTotal, $('#' + renderLoaderID));
            }, // onProgress callback currently not supported
            undefined, // onError callback
            function (err) {
              console.error('An error happened.');
            });
          } else {
            var texture = new THREE.VideoTexture(document.getElementById(element.id));
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat; // pause the video

            texture.image.autoplay = true;
            texture.image.loop = true;
            texture.image.currentTime = 0;
            texture.image.muted = false;
            texture.image.pause();
            loadSource(texture, index, offsetWidth, offsetHeight, objTotal, $('#' + renderLoaderID));
          }
        }); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
      }

      function render() {
        requestAnimationFrame(render);
        theta += 0.1; //To set a background color.
        //renderer.setClearColor( 0x000000 );	
        //Animating Three.js vertices

        allSources.forEach(function (element, index) {
          element.geometry.verticesNeedUpdate = true;
        }); //check all images loaded

        if (simple_3D_shatter_slider_js_typeof(allSources) != ( true ? "undefined" : undefined)) {
          if (!objLoaded && allSources.length === objTotal) {
            allSources.forEach(function (element, index) {
              scene.add(element); //if the first object is video and play it

              if (index == 0) {
                var videoObCur = element.material.map.image;

                if (videoObCur.localName == 'video') {
                  videoObCur.autoplay = true;
                  videoObCur.currentTime = 0;
                  videoObCur.muted = true;
                  videoObCur.play();
                }
              } //initialize all objects


              if (index > 0) {
                var fragment = element.geometry.vertices;

                for (var i = 0; i < fragment.length; i++) {
                  var pos = new THREE.Vector3();

                  var _final = Math.random();

                  pos.x = Math.random();
                  pos.y = Math.random() * (50 * i);
                  pos.z = Math.random() * -300;
                  fragment[i].x = pos.x;
                  fragment[i].y = pos.y;
                  fragment[i].z = pos.z;
                }
              }

              console.log(element);
            });
            objLoaded = true;
          }
        } //update camera and controls


        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      /*
       * Load Source
       *
       * @param  {Three.MeshBasicMaterial.map} texture         - Returns a new texture object which can directly be used for material creation.
       * @param  {Number} index           - Index of image or video.
       * @param  {Number} w               - The width of an image or video, in pixels. 
       * @param  {Number} h               - The height of an image or video, in pixels. 
       * @param  {Number} total           - Total number of preload images or video.
       * @param  {Element|String} loading         - Progress bar display control.
       * @return {Void}
       */


      function loadSource(texture, index, w, h, total, loading) {
        var imgW = w,
            imgH = h; // Immediately use the texture for material creation
        // Create a texture loader so we can load our image file

        material = new THREE.MeshBasicMaterial({
          map: texture
        });
        var geometryExplode = new THREE.BoxGeometry(imgW, imgH, 13),
            displacementSprite = new THREE.Mesh(geometryExplode, material);
        displacementSprite.minFilter = THREE.LinearFilter;
        displacementSprite.overdraw = true;
        displacementSprite.position.set(0, 0, 0);
        geometryExplode.center(); // Shattering Images

        var explodeModifier = new THREE.ExplodeModifier();
        explodeModifier.modify(geometryExplode); // add some additional vars to the
        // fragments to ensure we can do physics
        // and so on

        for (var i = 0; i < geometryExplode.vertices.length; i++) {
          var fragment = geometryExplode.vertices[i];
          fragment.origPos = {
            x: fragment.x,
            y: fragment.y,
            z: fragment.z
          };
        }

        allSources.push(displacementSprite); //loading

        TweenMax.to(loading, 0.5, {
          width: Math.round(100 * allSources.length / total) + '%',
          onComplete: function onComplete() {
            if ($(this.target).width() >= windowWidth - 50) {
              TweenMax.to(this.target, 0.5, {
                alpha: 0
              });
            }
          }
        });
      }
      /*
      * Trigger slider autoplay
      *
      * @param  {Function} playTimes            - Number of times.
      * @param  {Number} timing                 - Autoplay interval.
      * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
      * @param  {Element} slider                 - Selector of the slider .
      * @param  {String} countTotalID           - Total number ID or class of counter.
      * @param  {String} countCurID             - Current number ID or class of counter.
      * @param  {String} paginationID           - Navigation ID for paging control of each slide.
      * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
      * @return {Void}                          - The constructor.
      */


      function sliderAutoPlay(playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID) {
        var items = slider.find('.uix-3d-slider--shatter__item'),
            total = items.length;
        slider[0].animatedSlides = setInterval(function () {
          playTimes = parseFloat(items.filter('.is-active').index());
          playTimes++;

          if (!loop) {
            if (playTimes < total && playTimes >= 0) {
              var slideCurId = items.filter('.is-active').index(),
                  slideNextId = playTimes;
              sliderUpdates(slideCurId, slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
            }
          } else {
            if (playTimes == total) playTimes = 0;
            if (playTimes < 0) playTimes = total - 1;

            var _slideCurId = items.filter('.is-active').index(),
                _slideNextId = playTimes; //Prevent problems with styles when switching in positive order


            if (playTimes == 0) {
              sliderUpdates(_slideCurId, _slideNextId, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop);
            } else {
              sliderUpdates(_slideCurId, _slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
            }
          }
        }, timing);
      }
      /*
       *  Transition Between Slides
       *
       * @param  {Number} slideCurId             - Index of current slider.
       * @param  {Number} slideNextId            - Index of next slider.
       * @param  {String} dir                    - Switching direction indicator.	 
                * @param  {String} countTotalID           - Total number ID or class of counter.
                * @param  {String} countCurID             - Current number ID or class of counter.
                * @param  {String} paginationID           - Navigation ID for paging control of each slide.
                * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
                * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
       * @return {Void}
       */


      function sliderUpdates(slideCurId, slideNextId, dir, countTotalID, countCurID, paginationID, arrowsID, loop) {
        var $items = $sliderWrapper.find('.uix-3d-slider--shatter__item'),
            total = $items.length; //Prevent bubbling

        if (total == 1) {
          $(paginationID).hide();
          $(arrowsID).hide();
          return false;
        }

        if (!isAnimating) {
          isAnimating = true; //Transition Interception
          //-------------------------------------

          if (loop) {
            if (slideCurId > total - 1) slideCurId = 0;
            if (slideCurId < 0) slideCurId = total - 1; //--

            if (slideNextId < 0) slideNextId = total - 1;
            if (slideNextId > total - 1) slideNextId = 0;
          } else {
            if (slideCurId > total - 1) slideCurId = total - 1;
            if (slideCurId < 0) slideCurId = 0; //--

            if (slideNextId < 0) slideNextId = 0;
            if (slideNextId > total - 1) slideNextId = total - 1;
          } //Get previous and next index of item
          //-------------------------------------


          var $current = $sliderWrapper.find('.uix-3d-slider--shatter__item').eq(slideCurId);
          var $next = $sliderWrapper.find('.uix-3d-slider--shatter__item').eq(slideNextId);
          console.log('Current: ' + slideCurId + ' | Next: ' + slideNextId); //Determine the direction and add class to switching direction indicator.
          //-------------------------------------

          var dirIndicatorClass = '';
          if (dir == 'prev') dirIndicatorClass = 'prev';
          if (dir == 'next') dirIndicatorClass = 'next'; //Add transition class to each item
          //-------------------------------------	

          $items.removeClass('is-active leave prev next').addClass(dirIndicatorClass);
          $current.addClass('leave');
          $next.addClass('is-active'); //Add transition class to Controls Pagination
          //-------------------------------------

          $(paginationID).find('ul > li').removeClass('is-active leave prev next').addClass(dirIndicatorClass);
          $(paginationID).find('ul > li').eq(slideCurId).addClass('leave');
          $(paginationID).find('ul > li').eq(slideNextId).addClass('is-active'); //Add transition class to Arrows
          //-------------------------------------		

          if (!loop) {
            $(arrowsID).find('a').removeClass('is-disabled');
            if (slideNextId == total - 1) $(arrowsID).find('.uix-3d-slider--shatter__arrows--next').addClass('is-disabled');
            if (slideNextId == 0) $(arrowsID).find('.uix-3d-slider--shatter__arrows--prev').addClass('is-disabled');
          } //Display counter
          //-------------------------------------


          $(countTotalID).text(total);
          $(countCurID).text(parseFloat(slideCurId) + 1); //Pause all videos
          //-------------------------------------
          // pause all videos

          allSources.forEach(function (element, index) {
            var videoOb = element.material.map.image;

            if (videoOb.localName == 'video') {
              videoOb.autoplay = false;
              videoOb.currentTime = 0;
              videoOb.muted = true;
              videoOb.pause();
            }
          }); //Fire the next object
          //-------------------------------------

          activeSlider = slideNextId;

          if (simple_3D_shatter_slider_js_typeof(allSources[slideNextId]) != ( true ? "undefined" : undefined)) {
            var fragment = allSources[slideNextId].geometry.vertices;

            for (var i = 0; i < fragment.length; i++) {
              TweenMax.to(fragment[i], 2, {
                x: fragment[i].origPos.x,
                y: fragment[i].origPos.y,
                z: fragment[i].origPos.z,
                ease: "Expo.easeInOut"
              });
            }
          } // play the video


          var videoObCur = allSources[slideNextId].material.map.image;

          if (videoObCur.localName == 'video') {
            videoObCur.autoplay = true;
            videoObCur.currentTime = 0;
            videoObCur.muted = false;
            videoObCur.play();
          } //Fire the current object
          //-------------------------------------


          if (simple_3D_shatter_slider_js_typeof(allSources[slideCurId]) != ( true ? "undefined" : undefined)) {
            var _fragment = allSources[slideCurId].geometry.vertices;

            for (var _i = 0; _i < _fragment.length; _i++) {
              var pos = new THREE.Vector3();

              var _final2 = Math.random();

              pos.x = Math.random();
              pos.y = Math.random() * (50 * _i);
              pos.z = Math.random() * -300;
              TweenMax.to(_fragment[_i], 2, {
                x: pos.x,
                y: pos.y,
                z: pos.z,
                ease: "Expo.easeInOut",
                onComplete: function onComplete() {
                  //reset the trigger
                  isAnimating = false;
                }
              });
            }
          }
        } // end isAnimating

      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        wrapperInit: wrapperInit,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.wrapperInit();
    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_SHATTER_SLIDER.documentReady);
  return function THREE_SHATTER_SLIDER() {
    simple_3D_shatter_slider_js_classCallCheck(this, THREE_SHATTER_SLIDER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/simple-3D-explosive-particle-slider/scss/_style.scss
var simple_3D_explosive_particle_slider_scss_style = __webpack_require__(61);

// CONCATENATED MODULE: ./src/components/ES6/simple-3D-explosive-particle-slider/js/index.js
function simple_3D_explosive_particle_slider_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple_3D_explosive_particle_slider_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { simple_3D_explosive_particle_slider_js_typeof = function _typeof(obj) { return typeof obj; }; } else { simple_3D_explosive_particle_slider_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return simple_3D_explosive_particle_slider_js_typeof(obj); }

/* 
 *************************************
 * <!-- 3D Explosive Particle Slider -->
 *************************************
 */

/**
 * module.THREE_EXP_PARTICLE_SLIDER
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */


var THREE_EXP_PARTICLE_SLIDER = function (module, $, window, document) {
  if (window.THREE_EXP_PARTICLE_SLIDER === null) return false;
  module.THREE_EXP_PARTICLE_SLIDER = module.THREE_EXP_PARTICLE_SLIDER || {};
  module.THREE_EXP_PARTICLE_SLIDER.version = '0.0.7';

  module.THREE_EXP_PARTICLE_SLIDER.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('.uix-3d-slider--expParticle').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var $sliderWrapper = $('.uix-3d-slider--expParticle'),
          //Basic webGL renderers 
      renderLoaderID = 'uix-3d-slider--expParticle__loader',
          rendererOuterID = 'uix-3d-slider--expParticle__canvas-container',
          rendererCanvasID = 'uix-3d-slider--expParticle__canvas';
      var animSpeed = 1000; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          controls,
          scene,
          light,
          renderer,
          material,
          displacementSprite,
          clock = new THREE.Clock();
      var offsetWidth = 475,
          //Set the display width of the objects in the Stage
      offsetHeight = 375,
          //Set the display height of the objects in the Stage
      allSources = [],
          objTotal,
          objLoaded = false;
      var sources = [];
      var isAnimating = false; // constants

      var activeSlider = 0;
      var cube_count,
          meshes = [],
          materials = [],
          xgrid = 25,
          ygrid = 15;

      function wrapperInit() {
        $sliderWrapper.each(function () {
          var $this = $(this);
          var $items = $this.find('.uix-3d-slider--expParticle__item'),
              $first = $items.first(),
              itemsTotal = $items.length,
              activated = $this.data('activated');

          if (simple_3D_explosive_particle_slider_js_typeof(activated) === ( true ? "undefined" : undefined) || activated === 0) {
            //Get parameter configuration from the data-* attribute of HTML
            var dataControlsPagination = $this.data('controls-pagination'),
                dataControlsArrows = $this.data('controls-arrows'),
                dataLoop = $this.data('loop'),
                dataFilterTexture = $this.data('filter-texture'),
                dataDraggable = $this.data('draggable'),
                dataDraggableCursor = $this.data('draggable-cursor'),
                dataSpeed = $this.data('speed'),
                dataAuto = $this.data('auto'),
                dataTiming = $this.data('timing'),
                dataCountTotal = $this.data('count-total'),
                dataCountCur = $this.data('count-now');
            if (simple_3D_explosive_particle_slider_js_typeof(dataControlsPagination) === ( true ? "undefined" : undefined)) dataControlsPagination = '.uix-3d-slider--expParticle__pagination';
            if (simple_3D_explosive_particle_slider_js_typeof(dataControlsArrows) === ( true ? "undefined" : undefined) || dataControlsArrows == false) dataControlsArrows = '.uix-3d-slider--expParticle__arrows';
            if (simple_3D_explosive_particle_slider_js_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = false;
            if (simple_3D_explosive_particle_slider_js_typeof(dataFilterTexture) === ( true ? "undefined" : undefined) || !dataFilterTexture || dataFilterTexture == '') dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            if (simple_3D_explosive_particle_slider_js_typeof(dataDraggable) === ( true ? "undefined" : undefined)) dataDraggable = false;
            if (simple_3D_explosive_particle_slider_js_typeof(dataDraggableCursor) === ( true ? "undefined" : undefined)) dataDraggableCursor = 'move';
            if (simple_3D_explosive_particle_slider_js_typeof(dataAuto) === ( true ? "undefined" : undefined)) dataAuto = false;
            if (simple_3D_explosive_particle_slider_js_typeof(dataTiming) === ( true ? "undefined" : undefined)) dataTiming = 10000;
            if (simple_3D_explosive_particle_slider_js_typeof(dataCountTotal) === ( true ? "undefined" : undefined)) dataCountTotal = 'p.count em.count';
            if (simple_3D_explosive_particle_slider_js_typeof(dataCountCur) === ( true ? "undefined" : undefined)) dataCountCur = 'p.count em.current'; //Autoplay times

            var playTimes; //A function called "timer" once every second (like a digital watch).

            $this[0].animatedSlides; //If arrows does not exist on the page, it will be added by default, 
            //and the drag and drop function will be activated.

            if ($(dataControlsArrows).length == 0) {
              $('body').prepend('<div style="display:none;" class="uix-3d-slider--expParticle__arrows ' + dataControlsArrows.replace('#', '').replace('.', '') + '"><a href="#" class="uix-3d-slider--expParticle__arrows--prev"></a><a href="#" class="uix-3d-slider--expParticle__arrows--next"></a></div>');
            } //Prevent bubbling


            if (itemsTotal == 1) {
              $(dataControlsPagination).hide();
              $(dataControlsArrows).hide();
            } //Initialize the controlers classes
            //-------------------------------------	


            $(dataControlsPagination).find('ul > li').first().addClass('is-active'); //Initialize the wrapper width and height
            //-------------------------------------	

            $this.css('height', windowHeight + 'px'); //Load slides to canvas
            //-------------------------------------	

            if ($('#' + rendererCanvasID).length == 0) {
              $this.prepend('<div id="' + rendererOuterID + '" class="uix-3d-slider--expParticle__canvas-container"><canvas id="' + rendererCanvasID + '"></canvas></div>');
            } //Get the animation speed
            //-------------------------------------	


            if (simple_3D_explosive_particle_slider_js_typeof(dataSpeed) != ( true ? "undefined" : undefined) && dataSpeed != false) {
              animSpeed = dataSpeed;
            } //Initialize the first item container
            //-------------------------------------		


            $items.addClass('next');
            $first.addClass('is-active'); //Add identifiers for the first and last items
            //-------------------------------------		

            $items.last().addClass('last');
            $items.first().addClass('first'); //Get all images and videos
            //-------------------------------------		

            $items.each(function () {
              var _item = $(this);

              if (_item.find('video').length > 0) {
                //Returns the dimensions (intrinsic height and width ) of the video
                var video = document.getElementById(_item.find('video').attr('id'));

                var videoURL = _item.find('source:first').attr('src');

                if (simple_3D_explosive_particle_slider_js_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = _item.attr('src');

                if (simple_3D_explosive_particle_slider_js_typeof(videoURL) != ( true ? "undefined" : undefined)) {
                  sources.push({
                    "url": videoURL,
                    "id": _item.find('video').attr('id'),
                    "type": 'video'
                  });
                }
              } else {
                var imgURL = _item.find('img').attr('src');

                if (simple_3D_explosive_particle_slider_js_typeof(imgURL) != ( true ? "undefined" : undefined)) {
                  sources.push({
                    "url": imgURL,
                    "id": 'img-' + UixGUID.create(),
                    "type": 'img'
                  });
                }
              }
            }); //Pagination dots 
            //-------------------------------------	

            var _dot = '',
                _dotActive = '';
            _dot += '<ul>';

            for (var i = 0; i < itemsTotal; i++) {
              _dotActive = i == 0 ? 'class="is-active"' : '';
              _dot += '<li ' + _dotActive + ' data-index="' + i + '"><a href="javascript:"></a></li>';
            }

            _dot += '</ul>';
            if ($(dataControlsPagination).html() == '') $(dataControlsPagination).html(_dot); //Fire the slider transtion with buttons

            $(dataControlsPagination).find('ul > li').off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              var $btn = $(this);
              if ($btn.attr('aria-disabled') == 'true') return false;
              $(dataControlsPagination).find('ul > li').attr('aria-disabled', 'true');
              setTimeout(function () {
                $(dataControlsPagination).find('ul > li').attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $(dataControlsPagination).find('ul > li.is-active').index(),
                  slideNextId = $(this).index(); //Determine the direction

              var curDir = 'prev';

              if ($(this).attr('data-index') > slideCurId) {
                curDir = 'next';
              } //Transition Between Slides


              sliderUpdates(slideCurId, slideNextId, curDir, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }); //Next/Prev buttons
            //-------------------------------------		

            var _prev = $(dataControlsArrows).find('.uix-3d-slider--expParticle__arrows--prev'),
                _next = $(dataControlsArrows).find('.uix-3d-slider--expParticle__arrows--next');

            $(dataControlsArrows).find('a').attr('href', 'javascript:');
            $(dataControlsArrows).find('a').removeClass('is-disabled');

            if (!dataLoop) {
              _prev.addClass('is-disabled');
            }

            _prev.off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              if (_prev.attr('aria-disabled') == 'true') return false;

              _prev.attr('aria-disabled', 'true');

              setTimeout(function () {
                _prev.attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $items.filter('.is-active').index(),
                  slideNextId = parseFloat($items.filter('.is-active').index()) - 1; //Transition Between Slides

              sliderUpdates(slideCurId, slideNextId, 'prev', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            });

            _next.off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              if (_next.attr('aria-disabled') == 'true') return false;

              _next.attr('aria-disabled', 'true');

              setTimeout(function () {
                _next.attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $items.filter('.is-active').index(),
                  slideNextId = parseFloat($items.filter('.is-active').index()) + 1; //Transition Between Slides

              sliderUpdates(slideCurId, slideNextId, 'next', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }); //Autoplay Slider
            //-------------------------------------		


            if (dataAuto && !isNaN(parseFloat(dataTiming)) && isFinite(dataTiming)) {
              sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              $this.on({
                mouseenter: function mouseenter() {
                  clearInterval($this[0].animatedSlides);
                },
                mouseleave: function mouseleave() {
                  sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
                }
              });
            } //Prevents front-end javascripts that are activated with AJAX to repeat loading.


            $this.data('activated', 1);
          } //endif activated

        }); // end each				
      }

      function init() {
        //Core 3D stage begin
        //-------------------------------------		
        //camera
        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 10, 2500); // FlyCamera // FlyControls

        camera.movementSpeed = 100.0;
        camera.rollSpeed = 0.5;
        camera.position.y = 60;
        camera.position.z = 500; //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 0, 2000);
        scene.add(light); //WebGL Renderer	
        // create a render and set the size

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight); //controls

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.5;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.enableZoom = false;
        controls.target.set(0, 0, 0);
        controls.update(); //A loader for loading all images from array.

        var loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous'; //Preload

        objTotal = sources.length;
        sources.forEach(function (element, index) {
          if (element.type == 'img') {
            loader.load( // resource URL
            element.url, // onLoad callback
            function (texture) {
              loadSource(texture, index, offsetWidth, offsetHeight, objTotal, $('#' + renderLoaderID));
            }, // onProgress callback currently not supported
            undefined, // onError callback
            function (err) {
              console.error('An error happened.');
            });
          } else {
            var texture = new THREE.VideoTexture(document.getElementById(element.id));
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat; // pause the video

            texture.image.autoplay = true;
            texture.image.loop = true;
            texture.image.currentTime = 0;
            texture.image.muted = true;
            texture.image.play();
            loadSource(texture, index, offsetWidth, offsetHeight, objTotal, $('#' + renderLoaderID));
          }
        }); // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
      }

      function render() {
        requestAnimationFrame(render);
        var elapsed = clock.getElapsedTime(); //To set a background color.
        //renderer.setClearColor( 0x000000 );	
        //Display the destination object

        if (simple_3D_explosive_particle_slider_js_typeof(allSources[activeSlider]) != ( true ? "undefined" : undefined)) {
          var objects = allSources[activeSlider].children;
          var speed = Math.random() * .0002;

          for (var i = 0; i < objects.length; i++) {
            for (var j = 0; j < objects[i].parent.children.length; j++) {
              var obj = objects[i].parent.children[j];
              obj.position.x += (obj.origPos.x - obj.position.x) * speed;
              obj.position.y += (obj.origPos.y - obj.position.y) * speed;
              obj.position.z += (obj.origPos.z - obj.position.z) * speed;
            }
          }
        } //Hide inactive objects


        allSources.forEach(function (element, index) {
          if (index != activeSlider) {
            var _objects = element.children;

            var _speed = Math.random() * .00005;

            for (var _i = 0; _i < _objects.length; _i++) {
              for (var _j = 0; _j < _objects[_i].parent.children.length; _j++) {
                var _obj = _objects[_i].parent.children[_j];
                _obj.position.x += (_obj.targetPos.x - _obj.position.x) * _speed;
                _obj.position.y += (_obj.targetPos.y - _obj.position.y) * _speed;
                _obj.position.z += (_obj.targetPos.z - _obj.position.z) * _speed;
              }
            }
          }
        }); //check all images loaded

        if (simple_3D_explosive_particle_slider_js_typeof(allSources) != ( true ? "undefined" : undefined)) {
          if (!objLoaded && allSources.length === objTotal) {
            allSources.forEach(function (element, index) {
              scene.add(element);
              console.log(element);
            });
            objLoaded = true;
          }
        } //update camera and controls


        controls.update(); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var _i2 = 0; _i2 < sceneSubjects.length; _i2++) {
          sceneSubjects[_i2].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      /*
       * Load Source
       *
       * @param  {Three.MeshBasicMaterial.map} texture         - Returns a new texture object which can directly be used for material creation.
       * @param  {Number} index           - Index of image or video.
       * @param  {Number} w               - The width of an image or video, in pixels. 
       * @param  {Number} h               - The height of an image or video, in pixels. 
       * @param  {Number} total           - Total number of preload images or video.
       * @param  {Element|String} loading         - Progress bar display control.
       * @return {Void}
       */


      function loadSource(texture, index, w, h, total, loading) {
        var imgW = w,
            imgH = h; //

        var group = new THREE.Object3D();
        var i, j, ux, uy, ox, oy, geometry, xsize, ysize;
        ux = 1 / xgrid;
        uy = 1 / ygrid;
        xsize = imgW / xgrid;
        ysize = imgH / ygrid;
        cube_count = 0;

        for (i = 0; i < xgrid; i++) {
          for (j = 0; j < ygrid; j++) {
            ox = i;
            oy = j;
            geometry = new THREE.BoxBufferGeometry(xsize, ysize, xsize);
            changeUVS(geometry, ux, uy, ox, oy);
            materials[cube_count] = new THREE.MeshBasicMaterial({
              map: texture
            });
            material = materials[cube_count];
            displacementSprite = new THREE.Mesh(geometry, material);
            displacementSprite.position.x = (i - xgrid / 2) * xsize;
            displacementSprite.position.y = (j - ygrid / 2) * ysize;
            displacementSprite.position.z = 0;
            displacementSprite.scale.x = displacementSprite.scale.y = displacementSprite.scale.z = 1;
            displacementSprite.origPos = {
              x: displacementSprite.position.x,
              y: displacementSprite.position.y,
              z: displacementSprite.position.z
            }; //hide all

            var newPosX = 4000 * Math.random() * (Math.random() > 0.5 ? 1 : -1);
            var newPosY = 2000 * Math.random();
            var newPosZ = 3000 * Math.random();
            displacementSprite.position.x = newPosX;
            displacementSprite.position.y = newPosY;
            displacementSprite.position.z = newPosZ;
            displacementSprite.targetPos = {
              x: newPosX,
              y: newPosY,
              z: newPosZ
            }; //

            group.add(displacementSprite); //

            meshes[cube_count] = displacementSprite;
            cube_count += 1;
          }
        }

        allSources.push(group); //loading

        TweenMax.to(loading, 0.5, {
          width: Math.round(100 * allSources.length / total) + '%',
          onComplete: function onComplete() {
            if ($(this.target).width() >= windowWidth - 50) {
              TweenMax.to(this.target, 0.5, {
                alpha: 0
              });
            }
          }
        });
      }

      function changeUVS(geometry, unitx, unity, offsetx, offsety) {
        var uvs = geometry.attributes.uv.array;

        for (var i = 0; i < uvs.length; i += 2) {
          uvs[i] = (uvs[i] + offsetx) * unitx;
          uvs[i + 1] = (uvs[i + 1] + offsety) * unity;
        }
      }
      /*
      * Trigger slider autoplay
      *
      * @param  {Function} playTimes            - Number of times.
      * @param  {Number} timing                 - Autoplay interval.
      * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
      * @param  {Element} slider                 - Selector of the slider .
      * @param  {String} countTotalID           - Total number ID or class of counter.
      * @param  {String} countCurID             - Current number ID or class of counter.
      * @param  {String} paginationID           - Navigation ID for paging control of each slide.
      * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
      * @return {Void}                          - The constructor.
      */


      function sliderAutoPlay(playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID) {
        var items = slider.find('.uix-3d-slider--expParticle__item'),
            total = items.length;
        slider[0].animatedSlides = setInterval(function () {
          playTimes = parseFloat(items.filter('.is-active').index());
          playTimes++;

          if (!loop) {
            if (playTimes < total && playTimes >= 0) {
              var slideCurId = items.filter('.is-active').index(),
                  slideNextId = playTimes;
              sliderUpdates(slideCurId, slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
            }
          } else {
            if (playTimes == total) playTimes = 0;
            if (playTimes < 0) playTimes = total - 1;

            var _slideCurId = items.filter('.is-active').index(),
                _slideNextId = playTimes; //Prevent problems with styles when switching in positive order


            if (playTimes == 0) {
              sliderUpdates(_slideCurId, _slideNextId, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop);
            } else {
              sliderUpdates(_slideCurId, _slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
            }
          }
        }, timing);
      }
      /*
       *  Transition Between Slides
       *
       * @param  {Number} slideCurId             - Index of current slider.
       * @param  {Number} slideNextId            - Index of next slider.
       * @param  {String} dir                    - Switching direction indicator.	 
                * @param  {String} countTotalID           - Total number ID or class of counter.
                * @param  {String} countCurID             - Current number ID or class of counter.
                * @param  {String} paginationID           - Navigation ID for paging control of each slide.
                * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
                * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
       * @return {Void}
       */


      function sliderUpdates(slideCurId, slideNextId, dir, countTotalID, countCurID, paginationID, arrowsID, loop) {
        var $items = $sliderWrapper.find('.uix-3d-slider--expParticle__item'),
            total = $items.length; //Prevent bubbling

        if (total == 1) {
          $(paginationID).hide();
          $(arrowsID).hide();
          return false;
        }

        if (!isAnimating) {
          isAnimating = true; //Transition Interception
          //-------------------------------------

          if (loop) {
            if (slideCurId > total - 1) slideCurId = 0;
            if (slideCurId < 0) slideCurId = total - 1; //--

            if (slideNextId < 0) slideNextId = total - 1;
            if (slideNextId > total - 1) slideNextId = 0;
          } else {
            if (slideCurId > total - 1) slideCurId = total - 1;
            if (slideCurId < 0) slideCurId = 0; //--

            if (slideNextId < 0) slideNextId = 0;
            if (slideNextId > total - 1) slideNextId = total - 1;
          } //Get previous and next index of item
          //-------------------------------------


          var $current = $sliderWrapper.find('.uix-3d-slider--expParticle__item').eq(slideCurId);
          var $next = $sliderWrapper.find('.uix-3d-slider--expParticle__item').eq(slideNextId);
          console.log('Current: ' + slideCurId + ' | Next: ' + slideNextId); //Determine the direction and add class to switching direction indicator.
          //-------------------------------------

          var dirIndicatorClass = '';
          if (dir == 'prev') dirIndicatorClass = 'prev';
          if (dir == 'next') dirIndicatorClass = 'next'; //Add transition class to each item
          //-------------------------------------	

          $items.removeClass('is-active leave prev next').addClass(dirIndicatorClass);
          $current.addClass('leave');
          $next.addClass('is-active'); //Add transition class to Controls Pagination
          //-------------------------------------

          $(paginationID).find('ul > li').removeClass('is-active leave prev next').addClass(dirIndicatorClass);
          $(paginationID).find('ul > li').eq(slideCurId).addClass('leave');
          $(paginationID).find('ul > li').eq(slideNextId).addClass('is-active'); //Add transition class to Arrows
          //-------------------------------------		

          if (!loop) {
            $(arrowsID).find('a').removeClass('is-disabled');
            if (slideNextId == total - 1) $(arrowsID).find('.uix-3d-slider--expParticle__arrows--next').addClass('is-disabled');
            if (slideNextId == 0) $(arrowsID).find('.uix-3d-slider--expParticle__arrows--prev').addClass('is-disabled');
          } //Display counter
          //-------------------------------------


          $(countTotalID).text(total);
          $(countCurID).text(parseFloat(slideCurId) + 1); //Fire the next object
          //-------------------------------------

          activeSlider = slideNextId; //Fire the current object
          //-------------------------------------
          //Reset the trigger
          //-------------------------------------

          isAnimating = false;
        } // end isAnimating

      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        wrapperInit: wrapperInit,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.wrapperInit();
    MainStage.init();
    MainStage.render();
  };

  module.components.documentReady.push(module.THREE_EXP_PARTICLE_SLIDER.documentReady);
  return function THREE_EXP_PARTICLE_SLIDER() {
    simple_3D_explosive_particle_slider_js_classCallCheck(this, THREE_EXP_PARTICLE_SLIDER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-liquid-scrollspy-slider/js/shader/fragment-custom.glsl
/* harmony default export */ var js_shader_fragment_custom = ("#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D texture;\nuniform sampler2D texture2;\nuniform sampler2D disp;\n\n// uniform float time;\n// uniform float _rot;\nuniform float dispFactor;\nuniform float effectFactor;\n\n// vec2 rotate(vec2 v, float a) {\n//  float s = sin(a);\n//  float c = cos(a);\n//  mat2 m = mat2(c, -s, s, c);\n//  return m * v;\n// }\n\nvoid main() {\n\n    vec2 uv = vUv;\n\n    // uv -= 0.5;\n    // vec2 rotUV = rotate(uv, _rot);\n    // uv += 0.5;\n\n    vec4 disp = texture2D(disp, uv);\n\n    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);\n    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);\n\n    vec4 _texture = texture2D(texture, distortedPosition);\n    vec4 _texture2 = texture2D(texture2, distortedPosition2);\n\n    vec4 finalTexture = mix(_texture, _texture2, dispFactor);\n\n    gl_FragColor = finalTexture;\n    // gl_FragColor = disp;\n}");
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-liquid-scrollspy-slider/js/shader/vertex-custom.glsl
/* harmony default export */ var js_shader_vertex_custom = ("#define GLSLIFY 1\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}");
// EXTERNAL MODULE: ./src/components/ES6/simple-3D-liquid-scrollspy-slider/scss/_style.scss
var simple_3D_liquid_scrollspy_slider_scss_style = __webpack_require__(62);

// CONCATENATED MODULE: ./src/components/ES6/simple-3D-liquid-scrollspy-slider/js/index.js
function simple_3D_liquid_scrollspy_slider_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simple_3D_liquid_scrollspy_slider_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { simple_3D_liquid_scrollspy_slider_js_typeof = function _typeof(obj) { return typeof obj; }; } else { simple_3D_liquid_scrollspy_slider_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return simple_3D_liquid_scrollspy_slider_js_typeof(obj); }

/* 
 *************************************
 * <!-- 3D Liquid Scrollspy Slider -->
 *************************************
 */

/**
 * module.THREE_LIQUID_SCROLLSPY_SLIDER
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */




var THREE_LIQUID_SCROLLSPY_SLIDER = function (module, $, window, document) {
  if (window.THREE_LIQUID_SCROLLSPY_SLIDER === null) return false;
  module.THREE_LIQUID_SCROLLSPY_SLIDER = module.THREE_LIQUID_SCROLLSPY_SLIDER || {};
  module.THREE_LIQUID_SCROLLSPY_SLIDER.version = '0.1.1';

  module.THREE_LIQUID_SCROLLSPY_SLIDER.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('.uix-3d-slider--liquid-scrollspy').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var $sliderWrapper = $('.uix-3d-slider--liquid-scrollspy'),
          //Basic webGL renderers 
      renderLoaderID = 'uix-3d-slider--liquid-scrollspy__loader',
          rendererOuterID = 'uix-3d-slider--liquid-scrollspy__canvas-container',
          rendererCanvasID = 'uix-3d-slider--liquid-scrollspy__canvas';
      var animSpeed = 1000; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          controls,
          scene,
          light,
          renderer,
          material,
          displacementSprite,
          theta = 0;
      var offsetWidth = 1920,
          //Set the display width of the objects
      offsetHeight = 1080,
          //Set the display height of the objects
      imgAspect = offsetHeight / offsetWidth;
      var dispImage;
      var loader = new THREE.TextureLoader();
      loader.crossOrigin = 'anonymous';
      var textures;
      var sources = [];
      var isAnimating = false; //scroll spy

      var scrollspyEnable, scrollspyConfigAutoAnim, scrollspyConfigItems, scrollspyConfigCountTotal, scrollspyConfigCountCur, scrollspyConfigControlsPagination, scrollspyConfigControlsArrows, scrollspyConfigLoop; // constants

      var activeSlider = 0;

      function wrapperInit() {
        $sliderWrapper.each(function () {
          var $this = $(this);
          var $items = $this.find('.uix-3d-slider--liquid-scrollspy__item'),
              $first = $items.first(),
              itemsTotal = $items.length,
              activated = $this.data('activated');

          if (simple_3D_liquid_scrollspy_slider_js_typeof(activated) === ( true ? "undefined" : undefined) || activated === 0) {
            //Get parameter configuration from the data-* attribute of HTML
            var dataControlsPagination = $this.data('controls-pagination'),
                dataControlsArrows = $this.data('controls-arrows'),
                dataLoop = $this.data('loop'),
                dataFilterTexture = $this.data('filter-texture'),
                dataDraggable = $this.data('draggable'),
                dataDraggableCursor = $this.data('draggable-cursor'),
                dataSpeed = $this.data('speed'),
                dataAuto = $this.data('auto'),
                dataTiming = $this.data('timing'),
                dataCountTotal = $this.data('count-total'),
                dataCountCur = $this.data('count-now'),
                dataScrollspy = $this.data('scrollspy');
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataControlsPagination) === ( true ? "undefined" : undefined)) dataControlsPagination = '.uix-3d-slider--liquid-scrollspy__pagination';
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataControlsArrows) === ( true ? "undefined" : undefined) || dataControlsArrows == false) dataControlsArrows = '.uix-3d-slider--liquid-scrollspy__arrows';
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = false;
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataFilterTexture) === ( true ? "undefined" : undefined) || !dataFilterTexture || dataFilterTexture == '') dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataDraggable) === ( true ? "undefined" : undefined)) dataDraggable = false;
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataDraggableCursor) === ( true ? "undefined" : undefined)) dataDraggableCursor = 'move';
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataAuto) === ( true ? "undefined" : undefined)) dataAuto = false;
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataTiming) === ( true ? "undefined" : undefined)) dataTiming = 10000;
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataLoop) === ( true ? "undefined" : undefined)) dataLoop = false;
            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataScrollspy) === ( true ? "undefined" : undefined)) dataScrollspy = false; //Load displacement image

            dispImage = dataFilterTexture; //Autoplay times

            var playTimes; //A function called "timer" once every second (like a digital watch).

            $this[0].animatedSlides; //scroll spy config

            scrollspyEnable = dataScrollspy;
            scrollspyConfigAutoAnim = $this[0].animatedSlides;
            scrollspyConfigItems = $items;
            scrollspyConfigCountTotal = dataCountTotal;
            scrollspyConfigCountCur = dataCountCur;
            scrollspyConfigControlsPagination = dataControlsPagination;
            scrollspyConfigControlsArrows = dataControlsArrows;
            scrollspyConfigLoop = dataLoop; //If arrows does not exist on the page, it will be added by default, 
            //and the drag and drop function will be activated.

            if ($(dataControlsArrows).length == 0) {
              $('body').prepend('<div style="display:none;" class="uix-3d-slider--liquid-scrollspy__arrows ' + dataControlsArrows.replace('#', '').replace('.', '') + '"><a href="#" class="uix-3d-slider--liquid-scrollspy__arrows--prev"></a><a href="#" class="uix-3d-slider--liquid-scrollspy__arrows--next"></a></div>');
            } //Prevent bubbling


            if (itemsTotal == 1) {
              $(dataControlsPagination).hide();
              $(dataControlsArrows).hide();
            } //Initialize the controlers classes
            //-------------------------------------	


            $(dataControlsPagination).find('ul > li').first().addClass('is-active'); //Initialize the wrapper width and height
            //-------------------------------------	

            $this.css('height', windowWidth * imgAspect + 'px'); //Load slides to canvas
            //-------------------------------------	

            if ($('#' + rendererCanvasID).length == 0) {
              $this.prepend('<div id="' + rendererOuterID + '" class="uix-3d-slider--liquid-scrollspy__canvas-container"><canvas id="' + rendererCanvasID + '"></canvas></div>');
            } //Get the animation speed
            //-------------------------------------	


            if (simple_3D_liquid_scrollspy_slider_js_typeof(dataSpeed) != ( true ? "undefined" : undefined) && dataSpeed != false) {
              animSpeed = dataSpeed;
            } //Initialize the first item container
            //-------------------------------------		


            $items.addClass('next');
            $first.addClass('is-active'); //Add identifiers for the first and last items
            //-------------------------------------		

            $items.last().addClass('last');
            $items.first().addClass('first'); //Get all images and videos
            //-------------------------------------		

            $items.each(function () {
              var _item = $(this);

              if (_item.find('video').length > 0) {
                //Returns the dimensions (intrinsic height and width ) of the video
                var video = document.getElementById(_item.find('video').attr('id'));

                var videoURL = _item.find('source:first').attr('src');

                if (simple_3D_liquid_scrollspy_slider_js_typeof(videoURL) === ( true ? "undefined" : undefined)) videoURL = _item.attr('src');

                if (simple_3D_liquid_scrollspy_slider_js_typeof(videoURL) != ( true ? "undefined" : undefined)) {
                  sources.push({
                    "url": videoURL,
                    "id": _item.find('video').attr('id'),
                    "type": 'video'
                  });
                }
              } else {
                var imgURL = _item.find('img').attr('src');

                if (simple_3D_liquid_scrollspy_slider_js_typeof(imgURL) != ( true ? "undefined" : undefined)) {
                  sources.push({
                    "url": imgURL,
                    "id": 'img-' + UixGUID.create(),
                    "type": 'img'
                  });
                }
              }
            }); //Pagination dots 
            //-------------------------------------	

            var _dot = '',
                _dotActive = '';
            _dot += '<ul>';

            for (var i = 0; i < itemsTotal; i++) {
              _dotActive = i == 0 ? 'class="is-active"' : '';
              _dot += '<li ' + _dotActive + ' data-index="' + i + '"><a href="javascript:"></a></li>';
            }

            _dot += '</ul>';
            if ($(dataControlsPagination).html() == '') $(dataControlsPagination).html(_dot); //Fire the slider transtion with buttons

            $(dataControlsPagination).find('ul > li').off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              var $btn = $(this);
              if ($btn.attr('aria-disabled') == 'true') return false;
              $(dataControlsPagination).find('ul > li').attr('aria-disabled', 'true');
              setTimeout(function () {
                $(dataControlsPagination).find('ul > li').attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $(dataControlsPagination).find('ul > li.is-active').index(),
                  slideNextId = $(this).index(); //Determine the direction

              var curDir = 'prev';

              if ($(this).attr('data-index') > slideCurId) {
                curDir = 'next';
              } //Transition Between Slides


              sliderUpdates(slideCurId, slideNextId, curDir, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }); //Next/Prev buttons
            //-------------------------------------		

            var _prev = $(dataControlsArrows).find('.uix-3d-slider--liquid-scrollspy__arrows--prev'),
                _next = $(dataControlsArrows).find('.uix-3d-slider--liquid-scrollspy__arrows--next');

            $(dataControlsArrows).find('a').attr('href', 'javascript:');
            $(dataControlsArrows).find('a').removeClass('is-disabled');

            if (!dataLoop) {
              _prev.addClass('is-disabled');
            }

            _prev.off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              if (_prev.attr('aria-disabled') == 'true') return false;

              _prev.attr('aria-disabled', 'true');

              setTimeout(function () {
                _prev.attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $items.filter('.is-active').index(),
                  slideNextId = parseFloat($items.filter('.is-active').index()) - 1; //Transition Between Slides

              sliderUpdates(slideCurId, slideNextId, 'prev', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            });

            _next.off('click').on('click', function (e) {
              e.preventDefault(); //Prevent buttons' events from firing multiple times

              if (_next.attr('aria-disabled') == 'true') return false;

              _next.attr('aria-disabled', 'true');

              setTimeout(function () {
                _next.attr('aria-disabled', 'false');
              }, animSpeed);
              var slideCurId = $items.filter('.is-active').index(),
                  slideNextId = parseFloat($items.filter('.is-active').index()) + 1; //Transition Between Slides

              sliderUpdates(slideCurId, slideNextId, 'next', dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows, dataLoop); //Pause the auto play event

              clearInterval($this[0].animatedSlides);
            }); //Autoplay Slider
            //-------------------------------------		


            if (dataAuto && !isNaN(parseFloat(dataTiming)) && isFinite(dataTiming)) {
              sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              $this.on({
                mouseenter: function mouseenter() {
                  clearInterval($this[0].animatedSlides);
                },
                mouseleave: function mouseleave() {
                  sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
                }
              });
            } //Prevents front-end javascripts that are activated with AJAX to repeat loading.


            $this.data('activated', 1);
          } //endif activated

        }); // end each				
      }

      function loadImages() {
        var promises = [];

        var _loop = function _loop(i) {
          if (sources[i].type == 'img') {
            ///////////
            // IMAGE //
            ///////////   
            promises.push(new Promise(function (resolve, reject) {
              var img = document.createElement("img");
              img.crossOrigin = "anonymous";
              img.src = sources[i].url;

              img.onload = function (image) {
                //loading
                TweenMax.to("#" + renderLoaderID, 0.5, {
                  width: Math.round(100 * (i / sources.length)) + '%'
                }); //Compatible with safari and firefox

                if (simple_3D_liquid_scrollspy_slider_js_typeof(image.path) === ( true ? "undefined" : undefined)) {
                  return resolve(image.target.currentSrc);
                } else {
                  return resolve(image.path[0].currentSrc);
                }
              };
            }).then(makeThreeTexture));
          } else {
            ///////////
            // VIDEO //
            ///////////    
            promises.push(new Promise(function (resolve, reject) {
              //loading
              TweenMax.to("#" + renderLoaderID, 0.5, {
                width: Math.round(100 * (i / sources.length)) + '%'
              });
              $('#' + sources[i].id).one('loadedmetadata', resolve);
              return resolve(sources[i].url);
            }).then(makeThreeTexture));
          }
        };

        for (var i = 0; i < sources.length; i++) {
          _loop(i);
        }

        return Promise.all(promises);
      }

      function makeThreeTexture(url) {
        var texture;

        if (/[\/.](gif|jpg|jpeg|png)$/i.test(url)) {
          ///////////
          // IMAGE //
          ///////////   
          texture = loader.load(url);
        } else {
          ///////////
          // VIDEO //
          ///////////   
          var video = document.createElement('video');
          video.src = url;
          texture = new THREE.VideoTexture(video);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.format = THREE.RGBFormat; // pause the video

          texture.image.autoplay = true;
          texture.image.loop = true;
          texture.image.currentTime = 0;
          texture.image.muted = true;
          texture.image.play();
        }

        return texture;
      }

      function texturesInit() {
        //Must be placed behind the loadImages()
        loadImages().then(function (images) {
          //remove loading
          TweenMax.to($("#" + renderLoaderID), 0.5, {
            alpha: 0
          });
          init(images);
          render();
        });
      }

      function init(allTextures) {
        textures = allTextures; //Core 3D stage begin
        //-------------------------------------		
        //camera

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000); // FlyCamera // FlyControls

        camera.position.z = 1000; //Object 1 unit, equal to 1 pixel

        camera.lookAt = new THREE.Vector3(0, 0, 0); // Fit plane to screen

        var dist = 1000,
            vFOV = THREE.Math.degToRad(camera.fov),
            // convert vertical fov to radians
        objHeight = 2 * Math.tan(vFOV / 2) * dist,
            // visible height
        objWidth = objHeight * camera.aspect; // visible width   
        //Scene

        scene = new THREE.Scene(); //HemisphereLight

        scene.add(new THREE.AmbientLight(0x555555));
        light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 0, 2000);
        scene.add(light); //WebGL Renderer	
        // create a render and set the size

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(windowWidth, windowHeight); // Immediately use the texture for material creation
        // Create a texture loader so we can load our image file

        var texture1 = textures[0],
            texture2 = textures[1],
            intensity = 1,
            disp = loader.load(dispImage);
        disp.wrapS = disp.wrapT = THREE.RepeatWrapping;
        texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
        texture1.minFilter = texture2.minFilter = THREE.LinearFilter;
        texture1.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture2.anisotropy = renderer.capabilities.getMaxAnisotropy();
        var geometry = new THREE.PlaneBufferGeometry(objWidth, objHeight, 1);
        $('#' + rendererCanvasID).css('height', windowWidth * imgAspect + 'px');
        geometry.center();
        material = new THREE.ShaderMaterial({
          uniforms: {
            effectFactor: {
              type: "f",
              value: intensity
            },
            dispFactor: {
              type: "f",
              value: 0.0
            },
            texture: {
              type: "t",
              value: texture1
            },
            texture2: {
              type: "t",
              value: texture2
            },
            disp: {
              type: "t",
              value: disp
            }
          },
          vertexShader: js_shader_vertex_custom,
          fragmentShader: js_shader_fragment_custom,
          transparent: true,
          opacity: 1.0
        });
        displacementSprite = new THREE.Mesh(geometry, material);
        displacementSprite.position.set(0, 0, 0);
        scene.add(displacementSprite); //				TweenMax.to( material.uniforms.dispFactor, 1.5, {
        //					value: 1,
        //					ease: Expo.easeOut
        //				});	
        //                
        // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false); // Scrolling interaction with 3D scenes

        window.addEventListener('wheel', onMouseWheel, browser.supportsPassive ? {
          passive: true
        } : false);
      }

      function render() {
        requestAnimationFrame(render);
        theta += 0.1; //To set a background color.
        //renderer.setClearColor( 0x000000 );	
        //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene to display our scene through the camera's eye.


        renderer.render(scene, camera);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function onMouseWheel(e) {
        var scrollPos; //Gets a value that indicates the amount that the mouse wheel has changed.

        var dir,
            delta,
            mobileDeltaY = null;
        var touches = e.touches;

        if (touches && touches.length) {
          mobileDeltaY = startY - touches[0].pageY;
          scrollPos = touches[0].pageY;
        } else {
          delta = Math.max(-1, Math.min(1, -e.deltaY));
          scrollPos = e.deltaY;
        }

        if (mobileDeltaY != null) {
          if (mobileDeltaY >= 50) {
            //--- swipe up
            dir = 'up';
          }

          if (mobileDeltaY <= -50) {
            //--- swipe down
            dir = 'down';
          }
        } else {
          if (delta < 0) {
            //scroll down
            dir = 'down';
          } else {
            //scroll up
            dir = 'up';
          }
        } //-----


        if (scrollspyEnable) {
          var slideCurId = scrollspyConfigItems.filter('.is-active').index();
          var slideNextId;

          if (dir == 'down') {
            slideNextId = parseFloat(scrollspyConfigItems.filter('.is-active').index()) + 1; //Transition Between Slides

            sliderUpdates(slideCurId, slideNextId, 'next', scrollspyConfigCountTotal, scrollspyConfigCountCur, scrollspyConfigControlsPagination, scrollspyConfigControlsArrows, scrollspyConfigLoop); //Pause the auto play event

            clearInterval(scrollspyConfigAutoAnim);
          }

          if (dir == 'up') {
            slideNextId = parseFloat(scrollspyConfigItems.filter('.is-active').index()) - 1; //Transition Between Slides

            sliderUpdates(slideCurId, slideNextId, 'prev', scrollspyConfigCountTotal, scrollspyConfigCountCur, scrollspyConfigControlsPagination, scrollspyConfigControlsArrows, scrollspyConfigLoop); //Pause the auto play event

            clearInterval(scrollspyConfigAutoAnim);
          }
        }
      }
      /*
      * Trigger slider autoplay
      *
      * @param  {Function} playTimes            - Number of times.
      * @param  {Number} timing                 - Autoplay interval.
      * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
      * @param  {Element} slider                 - Selector of the slider .
      * @param  {String} countTotalID           - Total number ID or class of counter.
      * @param  {String} countCurID             - Current number ID or class of counter.
      * @param  {String} paginationID           - Navigation ID for paging control of each slide.
      * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
      * @return {Void}                          - The constructor.
      */


      function sliderAutoPlay(playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID) {
        var items = slider.find('.uix-3d-slider--liquid-scrollspy__item'),
            total = items.length;
        slider[0].animatedSlides = setInterval(function () {
          playTimes = parseFloat(items.filter('.is-active').index());
          playTimes++;

          if (!loop) {
            if (playTimes < total && playTimes >= 0) {
              var slideCurId = items.filter('.is-active').index(),
                  slideNextId = playTimes;
              sliderUpdates(slideCurId, slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
            }
          } else {
            if (playTimes == total) playTimes = 0;
            if (playTimes < 0) playTimes = total - 1;

            var _slideCurId = items.filter('.is-active').index(),
                _slideNextId = playTimes; //Prevent problems with styles when switching in positive order


            if (playTimes == 0) {
              sliderUpdates(_slideCurId, _slideNextId, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop);
            } else {
              sliderUpdates(_slideCurId, _slideNextId, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
            }
          }
        }, timing);
      }
      /*
       *  Transition Between Slides
       *
       * @param  {Number} slideCurId             - Index of current slider.
       * @param  {Number} slideNextId            - Index of next slider.
       * @param  {String} dir                    - Switching direction indicator.	 
                * @param  {String} countTotalID           - Total number ID or class of counter.
                * @param  {String} countCurID             - Current number ID or class of counter.
                * @param  {String} paginationID           - Navigation ID for paging control of each slide.
                * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
                * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
       * @return {Void}
       */


      function sliderUpdates(slideCurId, slideNextId, dir, countTotalID, countCurID, paginationID, arrowsID, loop) {
        var $items = $sliderWrapper.find('.uix-3d-slider--liquid-scrollspy__item'),
            total = $items.length; //Prevent bubbling

        if (total == 1) {
          $(paginationID).hide();
          $(arrowsID).hide();
          return false;
        }

        if (!isAnimating) {
          isAnimating = true; //Transition Interception
          //-------------------------------------

          if (loop) {
            if (slideCurId > total - 1) slideCurId = 0;
            if (slideCurId < 0) slideCurId = total - 1; //--

            if (slideNextId < 0) slideNextId = total - 1;
            if (slideNextId > total - 1) slideNextId = 0;
          } else {
            if (slideCurId > total - 1) slideCurId = total - 1;
            if (slideCurId < 0) slideCurId = 0; //--

            if (slideNextId < 0) slideNextId = 0;
            if (slideNextId > total - 1) slideNextId = total - 1;
          } //Get previous and next index of item
          //-------------------------------------


          var $current = $sliderWrapper.find('.uix-3d-slider--liquid-scrollspy__item').eq(slideCurId);
          var $next = $sliderWrapper.find('.uix-3d-slider--liquid-scrollspy__item').eq(slideNextId);
          console.log('Current: ' + slideCurId + ' | Next: ' + slideNextId); //Determine the direction and add class to switching direction indicator.
          //-------------------------------------

          var dirIndicatorClass = '';
          if (dir == 'prev') dirIndicatorClass = 'prev';
          if (dir == 'next') dirIndicatorClass = 'next'; //Add transition class to each item
          //-------------------------------------	

          $items.removeClass('is-active leave prev next').addClass(dirIndicatorClass);
          $current.addClass('leave');
          $next.addClass('is-active'); //Add transition class to Controls Pagination
          //-------------------------------------

          $(paginationID).find('ul > li').removeClass('is-active leave prev next').addClass(dirIndicatorClass);
          $(paginationID).find('ul > li').eq(slideCurId).addClass('leave');
          $(paginationID).find('ul > li').eq(slideNextId).addClass('is-active'); //Add transition class to Arrows
          //-------------------------------------		

          if (!loop) {
            $(arrowsID).find('a').removeClass('is-disabled');
            if (slideNextId == total - 1) $(arrowsID).find('.uix-3d-slider--liquid-scrollspy__arrows--next').addClass('is-disabled');
            if (slideNextId == 0) $(arrowsID).find('.uix-3d-slider--liquid-scrollspy__arrows--prev').addClass('is-disabled');
          } //Display counter
          //-------------------------------------


          $(countTotalID).text(total);
          $(countCurID).text(parseFloat(slideCurId) + 1); //Fire the next object
          //-------------------------------------

          activeSlider = slideNextId; //Update Texture

          material.uniforms.texture.value = textures[Math.floor(slideCurId)];
          material.uniforms.texture2.value = textures[Math.floor(slideNextId)]; //console.log( 'material.uniforms.texture: ' + material.uniforms.texture.value.image.currentSrc );
          //console.log( 'material.uniforms.texture2: ' + material.uniforms.texture2.value.image.currentSrc );

          TweenMax.to(material.uniforms.dispFactor, 1.5, {
            value: 1,
            ease: Expo.easeOut,
            onComplete: function onComplete() {
              //Update Texture
              var tx1ID, tx2ID;

              if (dir == 'prev') {
                material.uniforms.texture.value = textures[Math.floor(slideCurId)];
                material.uniforms.texture2.value = textures[Math.floor(slideNextId - 1)];

                if (loop) {
                  tx1ID = slideNextId;
                  tx2ID = slideNextId - 1;
                  if (slideNextId == 0) tx2ID = total - 1;
                } else {}
              }

              if (dir == 'next') {
                material.uniforms.texture.value = textures[Math.floor(slideCurId)];
                material.uniforms.texture2.value = textures[Math.floor(slideNextId)];

                if (loop) {
                  tx1ID = slideNextId;
                  tx2ID = slideNextId + 1;
                  if (slideNextId == total - 1) tx2ID = 0;
                } else {}
              }

              material.uniforms.texture.value = textures[Math.floor(tx1ID)];
              material.uniforms.texture2.value = textures[Math.floor(tx2ID)]; //console.log( 'New material.uniforms.texture: ' + material.uniforms.texture.value.image.currentSrc );
              //console.log( 'New material.uniforms.texture2: ' + material.uniforms.texture2.value.image.currentSrc ); 
              //console.log( '--------------------' );

              TweenMax.set(this.target, {
                value: 0
              }); //Reset the trigger
              //-------------------------------------

              isAnimating = false;
            }
          }); //Fire the current object
          //-------------------------------------
        } // end isAnimating

      } // 
      //-------------------------------------	


      return {
        wrapperInit: wrapperInit,
        texturesInit: texturesInit,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }();

    MainStage.wrapperInit(); //step 1

    MainStage.texturesInit(); // step 2
  };

  module.components.documentReady.push(module.THREE_LIQUID_SCROLLSPY_SLIDER.documentReady);
  return function THREE_LIQUID_SCROLLSPY_SLIDER() {
    simple_3D_liquid_scrollspy_slider_js_classCallCheck(this, THREE_LIQUID_SCROLLSPY_SLIDER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// CONCATENATED MODULE: ./src/components/ES6/simple-3D-filmic-effects/js/index.js
function simple_3D_filmic_effects_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- 3D Filmic Effects -->
 *************************************
 */

/**
 * module.THREE_FILMIC_EFF
 * 
 * @requires ./examples/assets/js/min/three.min.js
 * @requires ./src/components/ES5/_plugins-THREE
 */

var THREE_FILMIC_EFF = function (module, $, window, document) {
  if (window.THREE_FILMIC_EFF === null) return false;
  module.THREE_FILMIC_EFF = module.THREE_FILMIC_EFF || {};
  module.THREE_FILMIC_EFF.version = '0.0.2';

  module.THREE_FILMIC_EFF.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('#3D-filmic-effects-canvas').length == 0 || !Modernizr.webgl) return false;
    var sceneSubjects = []; // Import objects and animations dynamically

    var MainStage = function () {
      var $window = $(window);
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight;
      var rendererCanvasID = '3D-filmic-effects-canvas'; // Generate one plane geometries mesh to scene
      //-------------------------------------	

      var camera,
          scene,
          lights = [],
          renderer,
          clock = new THREE.Clock();
      var intersectionPlane;
      var composer, bloomPass, filmPass;

      function init() {
        //=================
        //camera
        camera = new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 1, 10000);
        camera.position.set(0, 0, 100);
        camera.lookAt(new THREE.Vector3(0, 0, 0)); //=================
        //Scene

        scene = new THREE.Scene(); //=================
        //Lights

        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.DirectionalLight(0xffffff);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(120, 200, 0);
        lights[2].intensity = 0.6;
        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]); //=================
        //WebGL Renderer		

        renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById(rendererCanvasID),
          //canvas
          alpha: true,
          antialias: true
        });
        renderer.setSize(windowWidth, windowHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; //=================
        //add bloom effect

        bloomPass = new THREE.BloomPass(1, // strength
        25, // kernel size
        4, // sigma ?
        256); //add film effect

        filmPass = new THREE.FilmPass(0.35, // noise intensity
        0.025, // scanline intensity
        648, // scanline count
        false); //-----

        var renderPass = new THREE.RenderPass(scene, camera);
        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectCopy.renderToScreen = true;
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);
        composer.addPass(filmPass);
        composer.addPass(effectCopy); //=================

        var planeGeometry = new THREE.PlaneGeometry(100000, 100000);
        var planeMaterial = new THREE.MeshNormalMaterial({
          side: THREE.DoubleSide
        });
        intersectionPlane = new THREE.Mesh(planeGeometry, planeMaterial);
        intersectionPlane.visible = false;
        scene.add(intersectionPlane);
        var hoverMaterial = new THREE.MeshNormalMaterial();
        var neutralMaterial = new THREE.MeshLambertMaterial({
          color: 0xffcccc
        });
        var selectedMaterial = new THREE.MeshBasicMaterial({
          color: 0x55ff88
        });
        var neutralGeometry = new THREE.IcosahedronGeometry(30, 1);
        var mesh = new THREE.Mesh(neutralGeometry, neutralMaterial);
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
        scene.add(mesh); //=================
        // Fires when the window changes

        window.addEventListener('resize', onWindowResize, false);
      }

      function render() {
        requestAnimationFrame(render); //To set a background color.

        renderer.setClearColor(0x000000); //push objects

        /*
        @Usage: 
             function CustomObj( scene ) {
                 const elements = new THREE...;
                scene.add( elements );
                 this.update = function( time ) {
                    elements.rotation.y = time*0.003;
                }
            }       
             sceneSubjects.push( new CustomObj( MainStage.getScene() ) );  
        */

        for (var i = 0; i < sceneSubjects.length; i++) {
          sceneSubjects[i].update(clock.getElapsedTime() * 1);
        } //render the scene with filter


        composer.render();
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      } // 
      //-------------------------------------	


      return {
        init: init,
        render: render,
        getRendererCanvasID: function getRendererCanvasID() {
          return rendererCanvasID;
        },
        getScene: function getScene() {
          return scene;
        },
        getCamera: function getCamera() {
          return camera;
        }
      };
    }(); // 


    MainStage.init();
    MainStage.render(); // Add stars to scene
    //-------------------------------------	

    var starScene = MainStage.getScene();
    var starCamera = MainStage.getCamera();

    function Stars(scene, terrainSize) {
      var starsGeometry = new THREE.IcosahedronGeometry(terrainSize, 4); // geometry deformation

      for (var i = 0; i < starsGeometry.vertices.length; i += 1) {
        var scalar = 1 + Math.random() + Math.random();
        starsGeometry.vertices[i].multiplyScalar(scalar);
      }

      var textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin("anonymous");
      var texture = textureLoader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAACAAIUyQ49AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AUUFhoiw1VdsQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAIQUlEQVR42u1baW/bRhB9u6Qkx1fiOFGcNCiaAGn//+9pG7RxTie1Y8u2TnL65a0xmcxSlCxbaWECCx6iyZ03b86lgbvtblvbJiKFiBTrnENcMwY9jjsA1rWVt0z54ADgXUcIQf7zADiCBXPc5XEBQDjS394KIOUNCx4ygmsTLAjERP0m5vgKkFUDUd6g4J7wHhgdAJsAppnHBgWIrBqI8hYE935L50n7mwDOtQlYk7CArAqI8gaE985zIBQ0g66JSFp4aQBDRCRcB4RyBcI3CW1/j4YVyQd0uIcStHYAsEBcsWFZEMoVaz2q82iuefcnBkQDgHWCtQJFzDVcx0mWS2hbGrQdG469vyk5Otx7mq7Ne615ZE2ijXm0BiCEICISAewwZE0c4aMR3u5hmFGoURpN63AoCojaMRMLQjKrKYBqlSZQ86E/8fjQCB/nnFszKc0Qh/I6DNaO5i0IDwnoOZXUuBVLmEAFYAZgjy87NQIXmREppL52nxGgAnCRAS7nUL3tCYBdKmkQQqhW4gNMShsAXAL4BOA5gN8AnAD4qgCwgFgTCer9hdrDsKDm31RzANiiaW5ybscAZiv1AU64uwTwkSD0AewDeGNAKBwAogGgQ0Z1jNevlb0HBYLdHlPwgiw64vNCJndYrBw2sd6OCwAfeNwD8Mo4NX1cGq/fUd7fnuvhPS+B+5Rm2AUwBvCZ9L+ao1dpLtsP0NrXNjqkOSQbf+UIUToC2uNew72l4z+e0Q9FCn+khMccX9HOBDKZXlR5fDoeKnMoAPzKa5/VxK0/0FEAAO5RkET7Stm/nu8ugA0CJjTFL4r20SZTTZliuYT27SgUCMkxBjqlXQDvjD/QjjBpOdKOKxPzrd0/pvCiIscXJycJJodY3ASU9uEI7yU6BTX4SYXYLoCXGcp3lG13yICciZS09/u8Ho3N58Lm1dxzviAuoX00mEOkNo4UhTsEwXOG3YwPsOHxgMKnUDmk5msn05zXj1jYBOZVetEZFZnwSGVmv1Bjuhm6p9piJQUbq+ZI5DM2eE2Y4R2rHCEquudKcLluHuA5Qc8cbKw/UxlaQSZ0yJJN0joBcKr+5lz1CUoCWjPhOqNAUYFQm/lIG+GzADTU+cgA4bGgUGHyhM7xIbW+w98eK1qfkxXHBOhSsWHG66NMUhUUENYMGqNBuUQegBZABOMc0/FTAnAAYJspbFQM2KSg50ywjgnCiYrxMVN2t5nvtavB0KLVZUFJtr5LAZ8TgC2CkLYdOrrPzCkmFP6dET73Ti8MXhuANq2ueaGyR8H69AX7dGyb5v09ldMnk3iXabCEOUpp7QiXaYlFE7p0KOuaNHaDdt8n/fsUfov32DWClPwMyYhUcgvtf0Y2pDHh/VPVpJl6LbPWDGDXpzRZms7Be0xaNlQ48xKdgvf1lfb3SPtOprRNawTbBOpE9QmGStiZGuk8mcyI905U7wLcVyIyBVCFEOrvAKD37yoH1TONjKBA6ahrIdPP013fxJiiYcFEFMg6W4yZDrH2OR2z0FITgEqlzmMCeiEi4xCClM7620hExvTA1psX1PwWX7KpihI9mUq1sOpMA3NuJa5aXloYfa5NYszQeUkhx/xdd5LlOmEwTSY9+CJDfX28RSpu0/ntA3hAlolhQZpYpeL/B/Yd3/N9U4f69lhrvZVDW1Qj9lrttLHS+ZQaOac9J/ucZhY89P1nZNulub923ikt59sOANJEMr34JsFrQ9EpNXdCQc5UojNR2qp4fsoa4oT3DciYqaF/3QKI7+bv9QTKBbUvplWtX+wBEKl1ofDvlSndY36QzGBAoQ8Z/08ISGrD/5kRvjYsqhsWTpbKAyTj5a32gxE+OdBtVbunxuUp4/y+mkPS/t8sp9+QNR2+52cAb1XXyGOBFyVk1QDAYYP2+pXqCO3RjpMD+0JKf1QO8R7vHwD4i/cccQz4+0M++wmjzgf1rjb0X6jA8apCu5wVzWJHNA2PfQqfkqRUzXVZE+ySGem4w3WFQ5pKKomT3aeMMp1fEKx0PlOA6P3VgmquJ9gWANsDtAsgpdr3KXxKnqq0UKFA2uDosiTuUeA3KuWtTLzf4LOTsCMAr9W5BUCa4n/rkrGBBcFZ+jogrZPwEzqzmWmI6q7wAYU7V9SWjEYLApZq/wmAP5yMr5X2F02E7Eqt7sSkju22KlxGqiMUTQsrqvx8zGfMjDZrR7Njan2L7wtstf2+TARoBQCXxT0wdBTo0+mJalhOFTvqzNJY4H2lSmm9pbHKsOErtf+Ez3upQGhF/WUZAMMCGOEvGe5mzgKFtzgaTCqby/gqhxGnBOGAz31Bc/ASt+sBQBYEh1r79OIVhf/HEd42MG2zQufvsxYJlh4DvjctkL5gwqQz2tW0xBxTeEThh5zIRSZpqk273LKgcgCoTSUomQwwhcBD+oVn9Amv234rtFA1qEB4QIc3IuUnjn2L4zhhogmc5gZMCV037HUWOGAWecDU+e1NNEWhmhoD2uEM336+EhTt7fpcMGmzNYEK/kdSkinArNO7ZILUFZGdEMJgpQDQD4gSHEbj3hpChP9lWdpsLe/l8k2fyX1zPz+LGYpIEJGYWl8rY0AIYWwAsQ0Tb3U296EkTBpbod2HknNLXVXSr9YHZHyC193x2tPiZJ8jFjyV+hYg96msZLS+nk9lTYiUhuwxt7wGRo8txYKmiu67Bs3aP5bWk8iwwUuk9HZBFjQ1UFcu+EoBmAOEzCm6Zsqhenn8N9d+6H+YyACBzHK1jQQwqznS5H9+aABykzaZpD4Z2mv/i3+amgeIAmZ0m0KvDYCGbYK77W6729ax/Qsf5ETUur8sQgAAAABJRU5ErkJggg==');
      var starMaterial = new THREE.PointsMaterial({
        map: texture,
        color: "#fff",
        size: 20,
        blending: THREE.AdditiveBlending,
        transparent: false
      });
      var stars = new THREE.Points(starsGeometry, starMaterial);
      scene.add(stars);

      this.update = function (time) {
        stars.rotation.y = time * 0.13;
      };
    }

    sceneSubjects.push(new Stars(starScene, 150));
  };

  module.components.documentReady.push(module.THREE_FILMIC_EFF.documentReady);
  return function THREE_FILMIC_EFF() {
    simple_3D_filmic_effects_js_classCallCheck(this, THREE_FILMIC_EFF);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/table/scss/_style.scss
var table_scss_style = __webpack_require__(3);

// CONCATENATED MODULE: ./src/components/ES6/table/js/basic.js
function js_basic_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Responsive Table -->
 *************************************
 */


var TABLE = function (module, $, window, document) {
  if (window.TABLE === null) return false;
  module.TABLE = module.TABLE || {};
  module.TABLE.version = '0.0.3';

  module.TABLE.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    /* 
     ---------------------------
     Duplicate title
     ---------------------------
     */

    var $resTable = $('table.uix-table.is-responsive, .uix-table.is-responsive table'),
        $thead = $resTable.find('thead'),
        $tbody = $resTable.find('tbody');
    $thead.find('th').each(function () {
      var data = $(this).html().replace(/<span\s+class=(\"|\')js-uix-table-responsive__hidden(\"|\')(([\s\S])*?)<\/span>/g, '');

      if (!$(this).attr('data-table')) {
        $(this).attr('data-table', data);
      }
    });
    $tbody.find('td').each(function () {
      var index = $(this).index();
      var data = $thead.find('th:eq(' + index + ')').attr('data-table');
      $(this).attr('data-table', data);
    });
    /* 
     ---------------------------
     With scroll bars
     ---------------------------
     */

    var resTableSCrolled = '.js-uix-table--responsive-scrolled',
        columns = $(resTableSCrolled + ' tr').length,
        rows = $(resTableSCrolled + ' th').length;
    tableDataScrolledInit(windowWidth);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth; // Do stuff here

        tableDataScrolledInit(windowWidth);
      }
    });

    function tableDataScrolledInit(w) {
      if (w <= 768) {
        for (var i = 0; i < rows; i++) {
          var maxHeight = $(resTableSCrolled + ' th:nth-child(' + i + ')').outerHeight();

          for (var j = 0; j < columns; j++) {
            if ($(resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight() > maxHeight) {
              maxHeight = $(resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight();
            }

            if ($(resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').prop('scrollHeight') > $(resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight()) {
              maxHeight = $(resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').prop('scrollHeight');
            }
          }

          for (var _j = 0; _j < columns; _j++) {
            $(resTableSCrolled + ' tr:nth-child(' + _j + ') td:nth-child(' + i + ')').css('height', maxHeight);
            $(resTableSCrolled + ' th:nth-child(' + i + ')').css('height', maxHeight);
          }
        }
      } else {
        $(resTableSCrolled + ' td, ' + resTableSCrolled + ' th').removeAttr('style');
      }
    }
  };

  module.components.documentReady.push(module.TABLE.documentReady);
  return function TABLE() {
    js_basic_classCallCheck(this, TABLE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/table/js/fn/sort-elements.js
var sort_elements = __webpack_require__(63);

// CONCATENATED MODULE: ./src/components/ES6/table/js/sorter.js
function sorter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Table Sorter -->
 *************************************
 */



var TABLE_SORTER = function (module, $, window, document) {
  if (window.TABLE_SORTER === null) return false;
  module.TABLE_SORTER = module.TABLE_SORTER || {};
  module.TABLE_SORTER.version = '0.0.3';

  module.TABLE_SORTER.documentReady = function ($) {
    $('.js-uix-table-sorter').each(function () {
      var $sortTable = $(this).find('table'); //add arrows

      $sortTable.find("[data-sort-type]").each(function () {
        if ($(this).find('.uix-table-sorter').length == 0) {
          $(this).wrapInner('<span class="uix-table-sorter" />');
        }

        var $th = $(this),
            thIndex = $th.index(),
            thType = $th.data('sort-type');
        var inverse = false;
        $th.off('click').on('click', function () {
          $sortTable.find('tbody td').filter(function () {
            return $(this).index() === thIndex;
          }).sortElements(function (a, b) {
            var txt1 = $.text([a]).replace(/(<([^>]+)>)/ig, ''),
                txt2 = $.text([b]).replace(/(<([^>]+)>)/ig, ''); //type of number

            if (thType == 'number') {
              txt1 = Number(txt1.replace(/[^0-9.-]+/g, ''));
              txt2 = Number(txt2.replace(/[^0-9.-]+/g, ''));
            } //type of date


            if (thType == 'date') {
              txt1 = new Date(txt1);
              txt2 = new Date(txt2);
            } //add filter class


            $sortTable.find('tbody tr').addClass('js-uix-newsort');

            if (txt1 > txt2) {
              if (inverse) {
                return -1;
              } else {
                return 1;
              }
            } else {
              if (inverse) {
                return 1;
              } else {
                return -1;
              }
            }
          }, function () {
            // parentNode is the element we want to move
            return this.parentNode;
          });
          inverse = !inverse;
        });
      });
    });
  };

  module.components.documentReady.push(module.TABLE_SORTER.documentReady);
  return function TABLE_SORTER() {
    sorter_classCallCheck(this, TABLE_SORTER);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/tabs/scss/_style.scss
var tabs_scss_style = __webpack_require__(64);

// CONCATENATED MODULE: ./src/components/ES6/tabs/js/index.js
function tabs_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tabs_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { tabs_js_typeof = function _typeof(obj) { return typeof obj; }; } else { tabs_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return tabs_js_typeof(obj); }

/* 
 *************************************
 * <!-- Tabs -->
 *************************************
 */


var TABS = function (module, $, window, document) {
  if (window.TABS === null) return false;
  module.TABS = module.TABS || {};
  module.TABS.version = '0.1.4';

  module.TABS.documentReady = function ($) {
    $('.uix-tabs').each(function (id) {
      var $this = $(this);
      var $li = $this.find('.uix-tabs__nav ul > li'),
          liWidth = $li.first().outerWidth(),
          liHeight = $li.first().outerHeight(),
          liNum = $li.length,
          $contentbox = $this.find('.uix-tabs__content'),
          isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/,
          tabBoxID = id;
      var ulWidth = $this.data('width'),
          fullwidth = $this.data('fullwidth'),
          rotation = $this.data('rotation'),
          rotationRadius = $this.data('rotation-radius'),
          rotationWapperDeg = $this.data('rotation-wrapper-angle'),
          rotationDisplay = $this.data('rotation-display');

      if (tabs_js_typeof(fullwidth) != ( true ? "undefined" : undefined) && fullwidth == 1) {
        $li.css('width', 100 / liNum + '%');
      }

      if (tabs_js_typeof(rotation) === ( true ? "undefined" : undefined)) {
        rotation = false;
      }

      if (tabs_js_typeof(rotationWapperDeg) === ( true ? "undefined" : undefined)) {
        rotationWapperDeg = 0;
      }

      if (tabs_js_typeof(rotationDisplay) === ( true ? "undefined" : undefined)) {
        rotationDisplay = 5;
      }

      $li.each(function (index) {
        index = index + 1;
        $(this).attr('href', 'javascript:');
        $(this).attr('data-tab', tabBoxID + '-tabs-show' + index);
      });
      $($contentbox).each(function (index) {
        index = index + 1;
        $(this).attr('id', tabBoxID + '-tabs-show' + index);
      }); // Tab Rotation Effect

      if (rotation) {
        $this.find('.uix-tabs__nav').css({
          'width': rotationRadius * 2 + 'px'
        });
        $this.find('.uix-tabs__nav ul').css({
          'width': rotationRadius * 2 + 'px',
          'height': rotationRadius * 2 + 'px',
          'transform': 'rotate(' + parseFloat(rotationWapperDeg) + 'deg)'
        }); //Layout components in a circle layout

        var step = 2 * Math.PI / rotationDisplay,
            pad = $this.find('.uix-tabs__nav ul').width();
        var angle = 0,
            transitionDelay = 0;
        $this.find('.uix-tabs__nav ul > li').each(function () {
          //Can'nt use arrow function here!!!
          // 'this' works differently with arrow fucntions
          var el = $(this),
              x = rotationRadius * Math.cos(angle) - liWidth / 2,
              y = rotationRadius * Math.sin(angle) - liHeight / 2;
          el.css({
            'transform': 'translate(' + parseFloat(x) + 'px,' + parseFloat(pad / 2 + y) + 'px)',
            'transition-delay': transitionDelay + "s"
          }).find('> a').css({
            'transform': 'rotate(' + parseFloat(-rotationWapperDeg) + 'deg)'
          });
          angle += step;
          transitionDelay += 0.15; //Click on the rotation effect
          //----------------------- begin ----------------------

          el.off('click').on('click', function (e) {
            var increase = Math.PI * 2 / rotationDisplay,
                n = $(this).index(),
                endAngle = n % rotationDisplay * increase;

            (function turn() {
              if (Math.abs(endAngle - angle) > 1 / 8) {
                var sign = endAngle > angle ? 1 : -1;
                angle = angle + sign / 8;
                setTimeout(turn, 20);
              } else {
                angle = endAngle;
              }

              $this.find('.uix-tabs__nav ul > li').each(function (index) {
                var x2 = Math.cos(-Math.PI / 2 + index * increase - angle) * rotationRadius - liWidth / 2,
                    y2 = Math.sin(-Math.PI / 2 + index * increase - angle) * rotationRadius + liHeight;
                $(this).css({
                  'transform': 'translate(' + parseFloat(x2) + 'px,' + parseFloat(y2) + 'px)',
                  'transition': 'none',
                  'transition-delay': 0
                }).find('> a').css({
                  'transform': 'rotate(' + parseFloat(-rotationWapperDeg) + 'deg)'
                });
              });
            })();
          }); //----------------------- end ----------------------
        });
      } // Tab Sliding Effext


      if ($this.find('.uix-tabs__nav ul > li:first .uix-tabs__marker').length == 0) {
        $this.find('.uix-tabs__nav ul > li:first').prepend('<div class="uix-tabs__marker"></div>');
      } // Tab Fade Effect


      $this.off('click').on('click', '.uix-tabs__nav ul > li', function (e) {
        var tabID = $(this).attr('data-tab'),
            index = parseFloat($(this).index() - 1);
        $this.find('.uix-tabs__nav ul > li').removeClass('is-active');
        $this.find('.uix-tabs__content').removeClass('is-active');
        $(this).addClass('is-active');
        $('#' + tabID).addClass('is-active'); //sliding marker

        var translateX = $(this).index() * 100,
            liHeight = $this.find('.uix-tabs__nav ul > li:first').outerHeight(),
            translateY = $(this).index() * liHeight;

        if (window.innerWidth <= 768) {
          $this.find('.uix-tabs__marker').css({
            'transform': 'translateY( ' + translateY + 'px )'
          });
        } else {
          $this.find('.uix-tabs__marker').css({
            'transform': 'translateX( ' + translateX + '% )'
          });
        }

        return false;
      }); // Init

      $this.find('.uix-tabs__nav ul > li.is-active').trigger('click'); //Active current tab

      var url = window.location.href,
          locArr,
          loc,
          curTab;

      if (url.indexOf('#') >= 0) {
        locArr = url.split('#');
        loc = locArr[1];
        curTab = $('.uix-tabs').find('ul > li:eq(' + loc + ')');
        curTab.trigger('click');
      }
    });
  };

  module.components.documentReady.push(module.TABS.documentReady);
  return function TABS() {
    tabs_js_classCallCheck(this, TABS);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/team-focus/scss/_style.scss
var team_focus_scss_style = __webpack_require__(65);

// CONCATENATED MODULE: ./src/components/ES6/team-focus/js/index.js
function team_focus_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function team_focus_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { team_focus_js_typeof = function _typeof(obj) { return typeof obj; }; } else { team_focus_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return team_focus_js_typeof(obj); }

/* 
 *************************************
 * <!-- Team Focus -->
 *************************************
 */


var TEAM_FOCUS = function (module, $, window, document) {
  if (window.TEAM_FOCUS === null) return false;
  module.TEAM_FOCUS = module.TEAM_FOCUS || {};
  module.TEAM_FOCUS.version = '0.0.3';

  module.TEAM_FOCUS.documentReady = function ($) {
    var teamFocusContent = '.uix-team-focus',
        teamFocusMask = '.uix-team-focus__mask';
    $(teamFocusContent).each(function () {
      var $this = $(this);
      var thisID = 'uix-team-focus-' + UixGUID.create(),
          el = '#' + thisID + '> div';
      var total = 0;
      var hoverWidth = $this.data('hover-width'),
          targetWidth = $this.data('target-width'),
          // Div over width as a percentage 
      targetInfo = $this.data('target-info'),
          // Corresponding character details display
      closeBtn = $this.data('close-btn');
      $this.attr('id', thisID);

      if (team_focus_js_typeof(hoverWidth) === ( true ? "undefined" : undefined)) {
        hoverWidth = 20;
      }

      if (team_focus_js_typeof(targetWidth) === ( true ? "undefined" : undefined)) {
        targetWidth = 80;
      }

      if (team_focus_js_typeof(closeBtn) === ( true ? "undefined" : undefined)) {
        closeBtn = '.close';
      }

      if (team_focus_js_typeof(targetInfo) === ( true ? "undefined" : undefined)) {
        targetInfo = '.uix-team-focus__info';
      }

      total = $(el).length;
      TweenMax.set(el, {
        width: 100 / total + '%'
      }); //Add an index to each item

      $(el).each(function (index) {
        $(this).attr('data-index', index);
      }); //Create item hover overlay effects

      $(el).on('mouseenter', function () {
        var $cur = $(this),
            $neighbor = $cur.siblings().not('.focus'); //Get the siblings of each element in the set of matched elements

        TweenMax.to($cur, 0.3, {
          width: hoverWidth + '%'
        });
        TweenMax.to($neighbor, 0.3, {
          width: (100 - hoverWidth) / (total - 1) + '%'
        });
      }); //Display the target item

      $(document).off('click.TEAM_FOCUS').on('click.TEAM_FOCUS', el, function (e) {
        e.preventDefault();
        var $cur = $(this),
            $neighbor = $cur.siblings(),
            //Get the siblings of each element in the set of matched elements
        $cloneItem = $cur.clone(); //The mask prevent click and hover

        $(teamFocusMask).show();
        $(el).removeClass('is-active');
        $cur.addClass('is-active');
        var $info = $(targetInfo),
            cName = $cur.data('name'),
            cPo = $cur.data('po'),
            cIntro = $cur.data('intro');
        TweenMax.set($info, {
          css: {
            opacity: 0,
            display: 'none'
          },
          onComplete: function onComplete() {
            TweenMax.to(this.target, 0.5, {
              css: {
                opacity: 1,
                display: 'block'
              }
            });
          }
        });
        $info.find('h4 strong').html(cName);
        $info.find('h4 em').html(cPo);
        $info.find('.uix-team-focus__info__text').html(cIntro);

        if (!$cur.hasClass('focus')) {
          $(el + '.focus').remove();
          TweenMax.set($cloneItem, {
            alpha: 0,
            onComplete: function onComplete() {
              this.target.prependTo('#' + thisID).addClass('focus');
            }
          });
          TweenMax.to(el, 0.3, {
            alpha: 1
          });
          TweenMax.to($cur, 0.3, {
            alpha: 0
          });
          TweenMax.to($neighbor, 0.3, {
            alpha: 0.3
          });
        }
      }); //Close the focus item

      $(document).off('click.TEAM_FOCUS_CLOSE').on('click.TEAM_FOCUS_CLOSE', el + '.focus, ' + closeBtn + ', ' + targetInfo + ', ' + teamFocusMask, function (e) {
        e.preventDefault(); //Remove the mask

        $(teamFocusMask).hide();
        TweenMax.to(el, 0.3, {
          width: 100 / total + '%',
          ease: Back.easeOut
        });
        TweenMax.to(el + '.focus', 0.3, {
          alpha: 0,
          onComplete: function onComplete() {
            $(el + '.focus').remove();
            TweenMax.to(el, 0.3, {
              alpha: 1
            });
          }
        });
        var $info = $(targetInfo);
        TweenMax.to($info, 0.5, {
          css: {
            opacity: 0,
            display: 'none'
          }
        });
        $info.find('h4 strong').html('');
        $info.find('h4 em').html('');
        $info.find('.uix-team-focus__info__text').html('');
      });
    });
  };

  module.components.documentReady.push(module.TEAM_FOCUS.documentReady);
  return function TEAM_FOCUS() {
    team_focus_js_classCallCheck(this, TEAM_FOCUS);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/text-effect/js/fn/text-anime.js
var text_anime = __webpack_require__(66);

// EXTERNAL MODULE: ./src/components/ES6/text-effect/scss/_style.scss
var text_effect_scss_style = __webpack_require__(67);

// CONCATENATED MODULE: ./src/components/ES6/text-effect/js/index.js
function text_effect_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Text effect -->
 *************************************
 */

/**
 * module.TEXT_EFFECT
 * 
 * @requires ./examples/assets/js/min/anime.min.js
 * @example 

 //The data-text-eff attribute on the same page cannot be duplicated.

<h3 data-text-eff="letters-eff-flyInOut1" data-text-eff-speed="800">Text Text</h3>
<h3 data-text-eff="letters-eff-flyInOut2" data-text-eff-speed="800">Text Text</h3>
<h3 data-text-eff="letters-eff-flyInOut3" data-text-eff-speed="800">Text Text</h3>
 
 */



var TEXT_EFFECT = function (module, $, window, document) {
  if (window.TEXT_EFFECT === null) return false;
  module.TEXT_EFFECT = module.TEXT_EFFECT || {};
  module.TEXT_EFFECT.version = '0.0.5';

  module.TEXT_EFFECT.pageLoaded = function () {
    $('[data-text-eff]').each(function (index) {
      $(document).UixTextEff({
        selectors: '[data-text-eff="' + $(this).data('text-eff') + '"]',
        scrollSpy: true
      });
    });
  };

  module.components.pageLoaded.push(module.TEXT_EFFECT.pageLoaded);
  return function TEXT_EFFECT() {
    text_effect_js_classCallCheck(this, TEXT_EFFECT);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/timeline/scss/_style.scss
var timeline_scss_style = __webpack_require__(68);

// CONCATENATED MODULE: ./src/components/ES6/timeline/js/index.js
function timeline_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timeline_js_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { timeline_js_typeof = function _typeof(obj) { return typeof obj; }; } else { timeline_js_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return timeline_js_typeof(obj); }

/* 
 *************************************
 * <!-- Timeline -->
 *************************************
 */


var TIMELINE = function (module, $, window, document) {
  if (window.TIMELINE === null) return false;
  module.TIMELINE = module.TIMELINE || {};
  module.TIMELINE.version = '0.1.6';

  module.TIMELINE.pageLoaded = function () {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    /*! 
     ---------------------------
           Horizontal Timeline
     ---------------------------
     */

    if (windowWidth > 768) {
      $('.uix-timeline__container-wrapper.is-horizontal').each(function () {
        var $this = $(this);
        var $container = $this.find('.uix-timeline__container.is-horizontal'),
            $timeline = $container.find('> .uix-timeline');
        var dateShowEle = $timeline.data('show-ele');

        if (timeline_js_typeof(dateShowEle) === ( true ? "undefined" : undefined)) {
          dateShowEle = '#timeline-number-show';
        }

        $this.find('.uix-timeline__btn--prev').off('click').on('click', function (e) {
          e.preventDefault();
          timelineUpdate($this, false, dateShowEle, true);
          return false;
        });
        $this.find('.uix-timeline__btn--next').off('click').on('click', function (e) {
          e.preventDefault();
          timelineUpdate($this, false, dateShowEle, false);
          return false;
        });
        $this.find('.uix-timeline__item .uix-timeline__item--img').off('click').on('click', function (e) {
          e.preventDefault();
          timelineUpdate($this, $(this).parent(), dateShowEle, false);
          return false;
        }); //Activate the default selection

        timelineUpdate($this, $this.find('.uix-timeline__item.is-active'), dateShowEle, false);

        if ($this.find('.uix-timeline__item.is-active').index() == 0) {
          $this.find('.uix-timeline__btn--prev').addClass('is-disabled');
        }

        if ($this.hasClass('is-reversed')) {
          // Set equal heights
          var setEqualHeights = function setEqualHeights(el) {
            var counter = 0;

            for (var i = 0; i < el.length; i++) {
              var singleHeight = $(el[i]).outerHeight(true);

              if (counter < singleHeight) {
                counter = singleHeight;
              }
            }

            for (var k = 0; k < el.length; k++) {
              $(el[k]).css('height', counter + 'px');
            }

            return counter;
          };

          var infoNewHeight = setEqualHeights($timeline.find('.uix-timeline__item--info')); // Reset container height

          $container.css({
            'padding': parseFloat(infoNewHeight + 64) + 'px 0'
          });
        }
      });
    }
    /*
     * Method that updates items of timeline
     *
     * @param  {Element} obj                  - Wrapper of timeline.
     * @param  {?Element} iscur                - The current item.
     * @param  {String} showEle              - Element ID or class name that push the current text.
     * @param  {Boolean} prev                - Whether to slide forward.
     * @return {Void}
     */


    function timelineUpdate(obj, iscur, showEle, prev) {
      var itemTotal = obj.find('.uix-timeline__item').length,
          tNav = obj.find('.uix-timeline__item'),
          tLoop = false;
      var curIndex = obj.find('.uix-timeline__item.is-active').index(),
          tarIndex; //Check if a value is an object currently

      if (iscur && timeline_js_typeof(iscur) === 'object') {
        curIndex = iscur.index();
        tarIndex = curIndex;
      } else {
        if (prev) {
          tarIndex = curIndex >= 0 ? curIndex - 1 : 0;
        } else {
          tarIndex = curIndex < itemTotal ? curIndex + 1 : itemTotal - 1;
        }
      } //loop the items


      obj.find('.uix-timeline__btn--prev, .uix-timeline__btn--next').removeClass('is-disabled');

      if (prev) {
        //Previous
        if (tLoop) {
          if (tarIndex < 0) tarIndex = itemTotal - 1;
        } else {
          if (tarIndex < 0) tarIndex = 0;
          if (tarIndex == 0) obj.find('.uix-timeline__btn--prev').addClass('is-disabled');
        }
      } else {
        //Next
        if (tLoop) {
          if (tarIndex == itemTotal) tarIndex = 0;
        } else {
          if (tarIndex > itemTotal - 1) tarIndex = itemTotal - 1;
          if (tarIndex > itemTotal - 2) obj.find('.uix-timeline__btn--next').addClass('is-disabled');
          if (tarIndex == 0) obj.find('.uix-timeline__btn--prev').addClass('is-disabled');
        }
      }

      tNav.removeClass('is-active');
      obj.find('.uix-timeline__item:eq(' + tarIndex + ')').addClass('is-active'); //scroll left

      var tNavW = 0;

      for (var i = 0; i < tarIndex; i++) {
        tNavW += obj.find('.uix-timeline__item:eq(' + i + ')').width();
      }

      obj.find('.uix-timeline__container.is-horizontal > .uix-timeline').css({
        'margin-left': -parseFloat(tNavW) + 'px'
      }); //Push the current text to element 

      $(showEle).text(obj.find('.uix-timeline__item:eq(' + tarIndex + ')').find('.uix-timeline__item--date').text());
    }
  };

  module.components.pageLoaded.push(module.TIMELINE.pageLoaded);
  return function TIMELINE() {
    timeline_js_classCallCheck(this, TIMELINE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/vertical-menu/scss/_style.scss
var vertical_menu_scss_style = __webpack_require__(69);

// CONCATENATED MODULE: ./src/components/ES6/vertical-menu/js/index.js
function vertical_menu_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- Vertical Menu -->
 *************************************
 */


var VERTICAL_MENU = function (module, $, window, document) {
  if (window.VERTICAL_MENU === null) return false;
  module.VERTICAL_MENU = module.VERTICAL_MENU || {};
  module.VERTICAL_MENU.version = '0.0.4';

  module.VERTICAL_MENU.documentReady = function ($) {
    var $window = $(window);
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var ulForDesktop = '.uix-v-menu__container:not(.is-mobile) ul.uix-menu'; // Menu Hover

    var mTop = 15;
    $(ulForDesktop + ' > li.multi-column > ul li ul').addClass('multi');
    $(ulForDesktop + ' > li:not(.multi-column) ul, .uix-v-menu__container:not(.is-mobile) li.multi-column > ul.sub-menu > li > ul, ' + ulForDesktop + ' li.multi-column > ul').css('margin-top', mTop + 'px');
    $(ulForDesktop + ' li').on('mouseenter', function () {
      TweenMax.set($(this).find(' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega'), {
        css: {
          opacity: 0,
          display: 'block',
          marginTop: mTop + 'px'
        },
        onComplete: function onComplete() {
          TweenMax.to(this.target, 0.3, {
            css: {
              opacity: 1,
              marginTop: 0
            },
            ease: Power2.easeOut
          });
        }
      }); //Calculate whether the total width of a large navigation is greater than the window

      var megaMenuW = $(ulForDesktop + ' > li.multi-column > ul').width(),
          megaMaxW = parseFloat(windowWidth - $(ulForDesktop).parent().width()),
          megaMenuCoLength = $(ulForDesktop + ' > li.multi-column > ul > li').length;

      if (megaMenuW > megaMaxW) {
        $(ulForDesktop + ' > li.multi-column > ul > li').css('width', megaMaxW / megaMenuCoLength + 'px');
      }
    }).on('mouseleave', function () {
      TweenMax.to($(this).find(' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega'), 0.3, {
        css: {
          opacity: 0,
          marginTop: mTop + 'px'
        },
        onComplete: function onComplete() {
          TweenMax.set(this.target, {
            css: {
              display: 'none'
            }
          });
        }
      });
    }); //Add Sub-menu Arrow

    $(ulForDesktop + ' li').each(function () {
      if ($(this).find('ul').length > 0) {
        $(this).prepend('<span class="uix-menu__arrow"></span>');
      }
    }); //Monitor the maximum height of the vertical navigation

    menuWrapInit(windowWidth, windowHeight);
    $window.on('resize', function () {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight; // Do stuff here

        menuWrapInit(windowWidth, windowHeight);
      }
    });
    /*
     * Monitor the maximum height of the vertical navigation
     *
     * @param  {Number} w         - Returns width of browser viewport
     * @param  {Number} h         - Returns height of browser viewport
     * @return {Void}
     */

    function menuWrapInit(w, h) {
      var $menuWrap = $('.uix-v-menu__container:not(.is-mobile)'),
          vMenuTop = 0; //This value is equal to the $vertical-menu-top variable in the SCSS

      var winHeight = h - vMenuTop; //WoedPress spy

      if ($('.admin-bar').length > 0) {
        winHeight = h - 132;
      }

      $menuWrap.css({
        position: 'fixed',
        height: winHeight + 'px',
        marginTop: 0
      });
      $window.off('scroll.VERTICAL_MENU touchmove.VERTICAL_MENU').on('scroll.VERTICAL_MENU touchmove.VERTICAL_MENU', function () {
        var curULHeight = $('ul.uix-menu').height(),
            scrolled = $(this).scrollTop();

        if (curULHeight > winHeight) {
          $menuWrap.css({
            position: 'absolute',
            height: curULHeight + 'px'
          });

          if (scrolled >= curULHeight - winHeight) {
            $menuWrap.css({
              position: 'fixed',
              marginTop: -(curULHeight - winHeight) + 'px'
            });
          } else {
            $menuWrap.css({
              position: 'absolute',
              marginTop: 0
            });
          }
        }

        if ($menuWrap.height() < winHeight) {
          $menuWrap.css({
            position: 'fixed',
            height: winHeight + 'px',
            marginTop: 0
          });
        }
      });
    }
  };

  module.components.documentReady.push(module.VERTICAL_MENU.documentReady);
  return function VERTICAL_MENU() {
    vertical_menu_js_classCallCheck(this, VERTICAL_MENU);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/wordpress/scss/_wp_core.scss
var _wp_core = __webpack_require__(70);

// EXTERNAL MODULE: ./src/components/ES6/wordpress/scss/_3rd_party_plugins.scss
var scss_3rd_party_plugins = __webpack_require__(71);

// CONCATENATED MODULE: ./src/components/ES6/wordpress/js/index.js
function wordpress_js_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *************************************
 * <!-- WordPress Core Scripts -->
 *************************************
 */



var WP_CORE = function (module, $, window, document) {
  if (window.WP_CORE === null) return false;
  module.WP_CORE = module.WP_CORE || {};
  module.WP_CORE.version = '0.0.1';

  module.WP_CORE.documentReady = function ($) {
    /* 
     ---------------------------
     Pagination
     ---------------------------
     */
    $('.uix-pagination__container li > span.current').each(function () {
      $(this).parent('li').addClass('is-active');
    });
    /* 
     ---------------------------
     Dropdown Categories
     ---------------------------
     */

    $('#cat').on('change', function () {
      var cvalue = $(this).val();

      if (cvalue) {
        location.href = homeUrl + "/?cat=" + cvalue;
      }

      return false;
    });
  };

  module.components.documentReady.push(module.WP_CORE.documentReady);
  return function WP_CORE() {
    wordpress_js_classCallCheck(this, WP_CORE);

    this.module = module;
  };
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/ES6/badges/scss/_style.scss
var badges_scss_style = __webpack_require__(72);

// EXTERNAL MODULE: ./src/components/ES6/blended-grid-layout/scss/_style.scss
var blended_grid_layout_scss_style = __webpack_require__(73);

// EXTERNAL MODULE: ./src/components/ES6/breadcrumbs/scss/_style.scss
var breadcrumbs_scss_style = __webpack_require__(74);

// EXTERNAL MODULE: ./src/components/ES6/button/scss/_style.scss
var button_scss_style = __webpack_require__(75);

// EXTERNAL MODULE: ./src/components/ES6/card/scss/_style.scss
var card_scss_style = __webpack_require__(76);

// EXTERNAL MODULE: ./src/components/ES6/circle-text/scss/_style.scss
var circle_text_scss_style = __webpack_require__(77);

// EXTERNAL MODULE: ./src/components/ES6/content-placeholder-animated/scss/_style.scss
var content_placeholder_animated_scss_style = __webpack_require__(78);

// EXTERNAL MODULE: ./src/components/ES6/dividing-line/scss/_style.scss
var dividing_line_scss_style = __webpack_require__(79);

// EXTERNAL MODULE: ./src/components/ES6/dots/scss/_style.scss
var dots_scss_style = __webpack_require__(80);

// EXTERNAL MODULE: ./src/components/ES6/dotted-line/scss/_style.scss
var dotted_line_scss_style = __webpack_require__(81);

// EXTERNAL MODULE: ./src/components/ES6/equal-width-columns/scss/_style.scss
var equal_width_columns_scss_style = __webpack_require__(82);

// EXTERNAL MODULE: ./src/components/ES6/features/scss/_style.scss
var features_scss_style = __webpack_require__(83);

// EXTERNAL MODULE: ./src/components/ES6/footer-templates/scss/_style.scss
var footer_templates_scss_style = __webpack_require__(84);

// EXTERNAL MODULE: ./src/components/ES6/gallery-grid-layout/scss/_style.scss
var gallery_grid_layout_scss_style = __webpack_require__(85);

// EXTERNAL MODULE: ./src/components/ES6/heading/scss/_style.scss
var heading_scss_style = __webpack_require__(86);

// EXTERNAL MODULE: ./src/components/ES6/image-animation/scss/_style.scss
var image_animation_scss_style = __webpack_require__(87);

// EXTERNAL MODULE: ./src/components/ES6/list-brands/scss/_style.scss
var list_brands_scss_style = __webpack_require__(88);

// EXTERNAL MODULE: ./src/components/ES6/list-maintain-aspect-ratio/scss/_style.scss
var list_maintain_aspect_ratio_scss_style = __webpack_require__(89);

// EXTERNAL MODULE: ./src/components/ES6/list-side-by-side/scss/_style.scss
var list_side_by_side_scss_style = __webpack_require__(90);

// EXTERNAL MODULE: ./src/components/ES6/list-side-by-side-img/scss/_style.scss
var list_side_by_side_img_scss_style = __webpack_require__(91);

// EXTERNAL MODULE: ./src/components/ES6/mouse-animation-scroll/scss/_style.scss
var mouse_animation_scroll_scss_style = __webpack_require__(92);

// EXTERNAL MODULE: ./src/components/ES6/overlay/scss/_style.scss
var overlay_scss_style = __webpack_require__(93);

// EXTERNAL MODULE: ./src/components/ES6/ribbon/scss/_style.scss
var ribbon_scss_style = __webpack_require__(94);

// EXTERNAL MODULE: ./src/components/ES6/shape-animation/scss/_style.scss
var shape_animation_scss_style = __webpack_require__(95);

// EXTERNAL MODULE: ./src/components/ES6/single-post/scss/_comments.scss
var _comments = __webpack_require__(96);

// EXTERNAL MODULE: ./src/components/ES6/single-post/scss/_editing.scss
var _editing = __webpack_require__(97);

// EXTERNAL MODULE: ./src/components/ES6/striking/scss/_style.scss
var striking_scss_style = __webpack_require__(98);

// EXTERNAL MODULE: ./src/components/ES6/team-fullwidth/scss/_style.scss
var team_fullwidth_scss_style = __webpack_require__(99);

// EXTERNAL MODULE: ./src/components/ES6/team-grid/scss/_style.scss
var team_grid_scss_style = __webpack_require__(100);

// EXTERNAL MODULE: ./src/components/ES6/testimonials/scss/_style.scss
var testimonials_scss_style = __webpack_require__(101);

// EXTERNAL MODULE: ./src/components/ES6/tooltip/scss/_style.scss
var tooltip_scss_style = __webpack_require__(102);

// EXTERNAL MODULE: ./src/components/ES6/vertical-separator/scss/_style.scss
var vertical_separator_scss_style = __webpack_require__(103);

// EXTERNAL MODULE: ./src/components/ES6/wave-background/scss/_style.scss
var wave_background_scss_style = __webpack_require__(104);

// CONCATENATED MODULE: ./src/components/ES6/_app-load.js
/*
 * Common website functions, Can be called separately in HTML pages or custom JavaScript.
 *    
 */



/*
 * Import modules from components
 *    
 */

/******/

/******/

/* base */










/******/

/******/

/* pages */











































































/******/

/******/

/* pages */

/* These modules do not contain JavaScript */


































// CONCATENATED MODULE: ./src/index.js
/*
 * Import third-party plugins from components of ES5
 * 
 * @description  Third-party plugins adopt pure file merger and do not import and export
 *        
 */

/*
 * Import modules from components of ES6
 * 
 *        
 */



/***/ })
/******/ ]);
//# sourceMappingURL=../css/uix-kit.css.map
//# sourceMappingURL=uix-kit.js.map