import { Layers as CraftLayers } from "@craftjs/layers"
import { LayerItem } from "./LayerItem"

export const Layers = () => {
    return (
        <div>
            <CraftLayers expandRootOnLoad={true} renderLayer={LayerItem} />
        </div>
    )
}