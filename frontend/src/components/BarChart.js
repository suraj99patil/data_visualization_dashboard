import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../redux/actions';

const BarChart = () => {
  const chartRef = useRef();
  const dispatch = useDispatch();
  const { chartData } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  useEffect(() => {
    const createBarChart = () => {
      // Chart creation code using D3.js
      const svg = d3.select(chartRef.current);

      // Declare the chart dimensions and margins.
      const width = 928;
      const height = 500;
      const marginTop = 30;
      const marginRight = 0;
      const marginBottom = 30;
      const marginLeft = 40;

      // Declare the x (horizontal position) scale.
      const x = d3
        .scaleBand()
        .domain(
          d3.groupSort(
            chartData,
            ([d]) => -d.averageIntensity,
            (d) => d._id
          )
        )
        .range([marginLeft, width - marginRight])
        .padding(0.1);

      // Declare the y (vertical position) scale.
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.averageIntensity)])
        .range([height - marginBottom, marginTop]);

      // Create the SVG container.
      svg
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;');

      // Add a rect for each bar.
      svg
        .append('g')
        .attr('fill', 'steelblue')
        .selectAll('rect')
        .data(chartData)
        .join('rect')
        .attr('x', (d) => x(d._id))
        .attr('y', (d) => y(d.averageIntensity))
        .attr('height', (d) => y(0) - y(d.averageIntensity))
        .attr('width', x.bandwidth());

      // Add the x-axis and label.
      svg
        .append('g')
        .attr('transform', `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      // Add the y-axis and label, and remove the domain line.
      svg
        .append('g')
        .attr('transform', `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => y.toFixed()))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .append('text')
            .attr('x', -marginLeft)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text('↑ Intensity')
        );
    };

    createBarChart();
  }, [chartData]);

  return <svg ref={chartRef}></svg>;
};

export default BarChart;
