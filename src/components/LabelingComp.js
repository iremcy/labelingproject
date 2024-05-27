import React, { useEffect, useState } from "react";
import Annotation from "react-image-annotation";
import { Row, Col } from "antd";
import { forwardRef } from "react";

const LabelingComp = forwardRef((props, canvasRef) => {
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});

  const onChange = (annotation) => {
    setAnnotation(annotation);
  };

  const onSubmit = (annotation) => {
    const { geometry, data } = annotation;
    setAnnotation({});
    setAnnotations(
      annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      })
    );
  };
  
  const draw = () => {
    var canvas = canvasRef.current;
    var context = canvas.getContext("2d");
    
    var img = new Image();
    img.setAttribute("src", props.image);
    img.crossOrigin = "Anonymous";
    
    img.onload = function () {
      const w = img.naturalWidth ? img.naturalWidth : img.width;
      const h = img.naturalHeight ? img.naturalHeight : img.height;
      canvas.width = w;
      canvas.height = h;
      context.clearRect(0, 0, w, h);
      context.drawImage(img, 0, 0);
      var imageData = context.getImageData(0, 0, w, h);
      
      // unselected areas become transparent
      if (annotations.length > 0) {
        for (var x = 0; x < imageData.width; x++) {
          for (var y = 0; y < imageData.height; y++) {
            var offset = (y * imageData.width + x) * 4;
            var isTransparent = true;
            annotations.forEach((a) => {
              var g = a.geometry;
              
              if (
                !(
                  x < (imageData.width * g.x) / 100 ||
                  x > (imageData.width * (g.x + g.width)) / 100 ||
                  y < (imageData.height * g.y) / 100 ||
                  y > (imageData.height * (g.y + g.height)) / 100
                )
              ) {
                isTransparent = false;
              }
            });
            
            if (isTransparent) {
              imageData.data[offset + 3] = 0;
            }
          }
        }
      }
      context.putImageData(imageData, 0, 0);
    };
  };
  
  // draw img when the file has first uploaded
  useEffect(() => {
    if (props.image) {
      draw();
    }
  }, [props.image]);

  // draw img when annotations change
  useEffect(() => {
    draw();
  }, [annotations]);

  return (
    <>
      <Row>
        <Col lg={12} sm={24}>
          {props.image && (
            <Annotation
              src={props.image}
              alt="Two pebbles anthropomorphized holding hands"
              annotations={annotations}
              value={annotation}
              onChange={onChange}
              onSubmit={onSubmit}
              allowTouch
            />
          )}
        </Col>
        <Col lg={12} sm={24}>
          <canvas
            ref={canvasRef}
            style={{ position: "relative", width: "100%" }}
          />
        </Col>
      </Row>
    </>
  );
})


export default LabelingComp;