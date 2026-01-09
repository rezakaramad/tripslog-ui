{{/*
vim: set filetype=mustache:
*/}}
{{/*
Expand the name of the chart.
*/}}
{{- define "tripslog-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "tripslog-ui.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "tripslog-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "tripslog-ui.labels" -}}
helm.sh/chart: {{ include "tripslog-ui.chart" . }}
{{ include "tripslog-ui.selectorLabels" . }}
{{- if .Values.image.tag }}
app.kubernetes.io/version: {{ .Values.image.tag | trunc 63 | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "tripslog-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "tripslog-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Pod specific labels
*/}}
{{- define "tripslog-ui.podLabels" -}}
{{- with .Values.podLabels }}
{{- toYaml . }}
{{- end }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "tripslog-ui.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "tripslog-ui.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Naming the database StatefulSet:
- If .Values.fullnameOverride is set → <fullnameOverride>-db
- Otherwise → "db"
*/}}
{{- define "tripslog-ui.dbname" -}}
{{- if .Values.fullnameOverride -}}
{{- printf "%s-db" .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
db
{{- end -}}
{{- end -}}

{{/*
Naming the application Deployment:
- If .Values.fullnameOverride is set → <fullnameOverride>-app
- Otherwise → "app"
*/}}
{{- define "tripslog-ui.appname" -}}
{{- if .Values.fullnameOverride -}}
{{- printf "%s-app" .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
app
{{- end -}}
{{- end -}}