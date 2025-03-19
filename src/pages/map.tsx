import { useEffect, useState, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Draw, Modify, Select } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";

const map = () => {

    const [fname, setFname] = useState<string>("");
    const mapRef = useRef<Map | null>(null);
    const vectorSourceRef = useRef(new VectorSource());
    const [interaction, setInteraction] = useState<Draw | Modify | null>(null);

    useEffect(() => {
        setFname(JSON.parse(localStorage.getItem("user") ?? "{}").fname ?? "");

        const vectorLayer = new VectorLayer({
            source: vectorSourceRef.current,
            style: new Style({
                stroke: new Stroke({ color: "red", width: 2 }),
                fill: new Fill({ color: "rgba(255, 0, 0, 0.2)" }),
            }),
        });

        const map = new Map({
            target: "map",
            layers: [new TileLayer({ source: new OSM() }), vectorLayer],
            view: new View({ center: [0, 0], zoom: 2 }),
        });

        mapRef.current = map;

        return () => {
            map.setTarget(undefined);
        };

    }, []);

    const addPolygon = () => {
        if (!mapRef.current) return;
        removeInteractions();
        const draw = new Draw({ source: vectorSourceRef.current, type: "Polygon" });
        mapRef.current.addInteraction(draw);
        setInteraction(draw);
    };

    const editPolygon = () => {
        if (!mapRef.current) return;
        removeInteractions();
        const modify = new Modify({ source: vectorSourceRef.current });
        mapRef.current.addInteraction(modify);
        setInteraction(modify);
    };

    const deletePolygon = () => {
        if (!mapRef.current) return;
        removeInteractions();
        const select = new Select();
        mapRef.current.addInteraction(select);
        select.on("select", (event) => {
            event.selected.forEach((feature) => {
                vectorSourceRef.current.removeFeature(feature);
            });
        });
    };

    const removeInteractions = () => {
        if (!mapRef.current || !interaction) return;
        mapRef.current.removeInteraction(interaction);
        setInteraction(null);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold uppercase">{fname}</h1>
            <div id="map" className="w-full h-[700px] border mt-4"></div>
            <div className="mt-4 flex gap-2">
                <button onClick={addPolygon} className="bg-green-500 text-white px-4 py-2 rounded">
                    Draw
                </button>
                <button onClick={editPolygon} className="bg-yellow-500 text-white px-4 py-2 rounded">
                    Edit
                </button>
                <button onClick={deletePolygon} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                </button>
            </div>
        </div>
    );
}

export default map