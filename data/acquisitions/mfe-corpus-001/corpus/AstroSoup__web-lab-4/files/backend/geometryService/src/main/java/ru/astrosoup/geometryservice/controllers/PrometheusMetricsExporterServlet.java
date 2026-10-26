package ru.astrosoup.geometryservice.controllers;

import io.prometheus.metrics.exporter.servlet.jakarta.PrometheusMetricsServlet;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/metrics")
public class PrometheusMetricsExporterServlet extends PrometheusMetricsServlet {

}
