import React, {useState} from "react";
import {GridCellParams} from "../DataGrid/Interfaces/ColumnInterface";
import "./ImageColumn.css"
export default function ImageColumn(props: GridCellParams) {
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(true);

    function toggleImage() {
        setShowImage(!showImage)
    }

    return (
        <div className="image-column">
            {!showImage ?
                <button className="myImg" onClick={() => {
                    toggleImage()
                }}> show Image </button>
                :
                <div className={"image-container"} onClick={toggleImage}>
                        <div id="myModal" className={"modal"}>
                            <span className="close">&times;</span>
                            <img style={{display: !loading ? 'block' : 'none'}} onLoad={() => setLoading(false)} alt={props.field} src={props.value}  className="modal-content"  />
                            {<div>loading ...</div>}
                            <div id="caption"></div>
                        </div>

                </div>
            }
        </div>
    );
}