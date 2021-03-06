import {
    IMotionControllerLayoutMap,
    IMinimalMotionControllerObject,
    MotionControllerHandness,
    WebXRAbstractMotionController
} from "./webXRAbstractMotionController";
import { Scene } from '../../scene';
import { AbstractMesh } from '../../Meshes/abstractMesh';
import { Mesh } from '../../Meshes/mesh';
import { Quaternion } from '../../Maths/math.vector';
import { WebXRMotionControllerManager } from './webXRMotionControllerManager';

/**
 * The motion controller class for the standard HTC-Vive controllers
 */
export class WebXRHTCViveMotionController extends WebXRAbstractMotionController {
    /**
     * The base url used to load the left and right controller models
     */
    public static MODEL_BASE_URL: string = 'https://controllers.babylonjs.com/vive/';
    /**
     * File name for the controller model.
     */
    public static MODEL_FILENAME: string = 'wand.babylon';

    public profileId = "htc-vive";

    private _modelRootNode: AbstractMesh;

    /**
     * Create a new Vive motion controller object
     * @param scene the scene to use to create this controller
     * @param gamepadObject the corresponding gamepad object
     * @param handness the handness of the controller
     */
    constructor(scene: Scene,
        gamepadObject: IMinimalMotionControllerObject,
        handness: MotionControllerHandness) {
        super(scene, HTCViveLayout[handness], gamepadObject, handness);
    }

    protected _processLoadedModel(_meshes: AbstractMesh[]): void {
        this.getComponentIds().forEach((id) => {
            const comp = id && this.getComponent(id);
            if (comp) {
                comp.onButtonStateChangedObservable.add((component) => {

                    if (!this.rootMesh || this.disableAnimation) { return; }

                    switch (id) {
                        case "xr-standard-trigger":
                            (<AbstractMesh>(this._modelRootNode.getChildren()[6])).rotation.x = -component.value * 0.15;
                            return;
                        case "xr-standard-touchpad":
                            return;
                        case "xr-standard-squeeze":
                            return;
                    }
                }, undefined, true);
            }
        });
    }

    protected _getFilenameAndPath(): { filename: string; path: string; } {
        let filename = WebXRHTCViveMotionController.MODEL_FILENAME;
        let path = WebXRHTCViveMotionController.MODEL_BASE_URL;

        return {
            filename,
            path
        };
    }

    protected _updateModel(): void {
        // no-op. model is updated using observables.
    }

    protected _getModelLoadingConstraints(): boolean {
        return true;
    }

    protected _setRootMesh(meshes: AbstractMesh[]): void {
        this.rootMesh = new Mesh(this.profileId + " " + this.handness, this.scene);

        meshes.forEach((mesh) => { mesh.isPickable = false; });
        this._modelRootNode = meshes[1];
        this._modelRootNode.parent = this.rootMesh;
        this.rootMesh.rotationQuaternion = Quaternion.FromEulerAngles(0, Math.PI, 0);
    }

}

// register the profile
WebXRMotionControllerManager.RegisterController("htc-vive", (xrInput: XRInputSource, scene: Scene) => {
    return new WebXRHTCViveMotionController(scene, <any>(xrInput.gamepad), xrInput.handedness);
});

// WebXRMotionControllerManager.RegisterController("htc-vive-legacy", (xrInput: XRInputSource, scene: Scene) => {
//     return new WebXRHTCViveMotionController(scene, <any>(xrInput.gamepad), xrInput.handedness, true);
// });

const HTCViveLayout: IMotionControllerLayoutMap = {
    "left": {
        "selectComponentId": "xr-standard-trigger",
        "components": {
            "xr-standard-trigger": {
                "type": "trigger",
                "gamepadIndices": {
                    "button": 0
                },
                "rootNodeName": "xr_standard_trigger",
                "visualResponses": {

                }
            },
            "xr-standard-squeeze": {
                "type": "squeeze",
                "gamepadIndices": {
                    "button": 1
                },
                "rootNodeName": "xr_standard_squeeze",
                "visualResponses": {

                }
            },
            "xr-standard-touchpad": {
                "type": "touchpad",
                "gamepadIndices": {
                    "button": 2,
                    "xAxis": 0,
                    "yAxis": 1
                },
                "rootNodeName": "xr_standard_touchpad",
                "visualResponses": {

                },
            },
            "menu": {
                "type": "button",
                "gamepadIndices": {
                    "button": 4
                },
                "rootNodeName": "menu",
                "visualResponses": {

                }
            }
        },
        "gamepadMapping": "xr-standard",
        "rootNodeName": "htc_vive_none",
        "assetPath": "none.glb"
    },
    "right": {
        "selectComponentId": "xr-standard-trigger",
        "components": {
            "xr-standard-trigger": {
                "type": "trigger",
                "gamepadIndices": {
                    "button": 0
                },
                "rootNodeName": "xr_standard_trigger",
                "visualResponses": {

                }
            },
            "xr-standard-squeeze": {
                "type": "squeeze",
                "gamepadIndices": {
                    "button": 1
                },
                "rootNodeName": "xr_standard_squeeze",
                "visualResponses": {

                }
            },
            "xr-standard-touchpad": {
                "type": "touchpad",
                "gamepadIndices": {
                    "button": 2,
                    "xAxis": 0,
                    "yAxis": 1
                },
                "rootNodeName": "xr_standard_touchpad",
                "visualResponses": {

                },
            },
            "menu": {
                "type": "button",
                "gamepadIndices": {
                    "button": 4
                },
                "rootNodeName": "menu",
                "visualResponses": {

                }
            }
        },
        "gamepadMapping": "xr-standard",
        "rootNodeName": "htc_vive_none",
        "assetPath": "none.glb"
    },
    "none": {
        "selectComponentId": "xr-standard-trigger",
        "components": {
            "xr-standard-trigger": {
                "type": "trigger",
                "gamepadIndices": {
                    "button": 0
                },
                "rootNodeName": "xr_standard_trigger",
                "visualResponses": {

                }
            },
            "xr-standard-squeeze": {
                "type": "squeeze",
                "gamepadIndices": {
                    "button": 1
                },
                "rootNodeName": "xr_standard_squeeze",
                "visualResponses": {

                }
            },
            "xr-standard-touchpad": {
                "type": "touchpad",
                "gamepadIndices": {
                    "button": 2,
                    "xAxis": 0,
                    "yAxis": 1
                },
                "rootNodeName": "xr_standard_touchpad",
                "visualResponses": {

                },
            },
            "menu": {
                "type": "button",
                "gamepadIndices": {
                    "button": 4
                },
                "rootNodeName": "menu",
                "visualResponses": {

                }
            }
        },
        "gamepadMapping": "xr-standard",
        "rootNodeName": "htc-vive-none",
        "assetPath": "none.glb"
    }
};
