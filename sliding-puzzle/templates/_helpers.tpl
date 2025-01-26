{{- define "sliding-puzzle.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "sliding-puzzle.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name (include "sliding-puzzle.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
