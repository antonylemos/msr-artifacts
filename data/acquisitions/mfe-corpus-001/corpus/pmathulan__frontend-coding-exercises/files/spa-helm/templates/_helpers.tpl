{{- define "spa.fullname" -}}
{{ .Release.Name }}-spa
{{- end }}

{{- define "spa.labels" -}}
app.kubernetes.io/name: {{ include "spa.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
