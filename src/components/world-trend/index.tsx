import React from 'react';
import { Chart } from '@antv/g2';
import Measure from 'react-measure';
import DataSet from '@antv/data-set';
import mapData from '../../countries.geo.json';
import { useConfirmData } from '../../hooks/data';

const container = 'world-trend-chart';

const WorldTrend: React.FC<{}> = () => {
  const [width, setWidth] = React.useState<number>();
  const [hasRendered, setHasRendered] = React.useState(false);
  const { data: confirmedData } = useConfirmData();

  React.useEffect(() => {
    if (!confirmedData || !width || hasRendered) {
      return;
    }
    const chart = new Chart({
      container,
      autoFit: true,
      height: (width / 971) * 800,
    });
    setHasRendered(true);
    // force sync scales
    chart.scale({
      x: { sync: true },
      y: { sync: true },
    });
    chart.coordinate('rect').reflect('y');
    chart.legend(false);
    chart.axis(false);

    // data set
    const ds = new DataSet();

    // draw the map
    const dv = ds.createView('back')
      .source(mapData, {
        type: 'GeoJSON',
      })
      .transform({
        type: 'geo.projection',
        projection: 'geoMercator',
        as: ['x', 'y', 'centroidX', 'centroidY'],
      });
    const bgView = chart.createView();
    bgView.data(dv.rows);
    bgView.tooltip(false);
    bgView.polygon()
      .position('x*y')
      .style({
        fill: '#DDDDDD',
        stroke: '#b1b1b1',
        lineWidth: 0.5,
        fillOpacity: 0.85,
      });

    // draw the bubble plot
    const userData = ds.createView().source(confirmedData);
    userData.transform({
      type: 'map',
      callback: (obj) => {
        const projectedCoord = dv.geoProjectPosition([obj.long * 1, obj.lat * 1], 'geoMercator');
        // eslint-disable-next-line
        obj.x = projectedCoord[0];
        // eslint-disable-next-line
        obj.y = projectedCoord[1];
        // eslint-disable-next-line
        obj.confirmed *= 1;
        return obj;
      },
    });
    const pointView = chart.createView();
    pointView.data(userData.rows);
    pointView.point()
      .position('x*y')
      .size('confirmed', [2, 30])
      .shape('circle')
      .color('#FF2F29')
      .tooltip('combinedKey*confirmed')
      .style({
        fillOpacity: 0.45,
        lineWidth: 0,
      })
      .state({
        active: {
          style: {
            lineWidth: 1,
            stroke: '#FF2F29',
          },
        },
      });
    pointView.interaction('element-active');

    chart.render();
  }, [confirmedData, width, hasRendered]);

  return (
    <Measure
      bounds
      onResize={(contentRect) => {
        if (contentRect.bounds) {
          setWidth(contentRect.bounds.width);
        }
      }}
    >
      {({ measureRef }) => (
        <div ref={measureRef} id={container} />
      )}
    </Measure>

  );
};

export default WorldTrend;
