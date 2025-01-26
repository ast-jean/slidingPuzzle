.PHONY: install upgrade uninstall status rollback

# Variables
NAMESPACE=puzzle-namespace
RELEASE_NAME=sliding-puzzle
CHART_DIR=./sliding-puzzle
VALUES_FILE=values.yaml

# Install the Helm chart
install:
	helm install $(RELEASE_NAME) $(CHART_DIR) \
	    --namespace $(NAMESPACE) \
	    --create-namespace \
	    --values $(CHART_DIR)/$(VALUES_FILE)

# Upgrade the Helm release
upgrade:
	helm upgrade $(RELEASE_NAME) $(CHART_DIR) \
	    --namespace $(NAMESPACE) \
	    --values $(CHART_DIR)/$(VALUES_FILE)

# Uninstall the Helm release
uninstall:
	helm uninstall $(RELEASE_NAME) --namespace $(NAMESPACE)

# Check the status of the Helm release
status:
	helm status $(RELEASE_NAME) --namespace $(NAMESPACE)

# Rollback to the previous Helm release
rollback:
	helm rollback $(RELEASE_NAME) 0 --namespace $(NAMESPACE)

# Lint the Helm chart to ensure it is valid
lint:
	helm lint $(CHART_DIR)

# Test the deployment (optional, if you have tests defined)
test:
	helm test $(RELEASE_NAME) --namespace $(NAMESPACE)

# Get all resources in the namespace
resources:
	kubectl get all -n $(NAMESPACE)

# Delete all resources in the namespace
clean:
	kubectl delete all --all -n $(NAMESPACE)
