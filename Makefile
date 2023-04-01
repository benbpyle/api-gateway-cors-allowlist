build: 
	cdk synth

deploy-local:
	make build
	cdk deploy --profile=personal
