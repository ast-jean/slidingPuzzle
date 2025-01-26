unsolvable:
[8,1,5,2,0,3,4,7,6]
[1,2,3,4,5,6,8,7,0]
[1,2,3,4,6,5,7,8,0]
815203476


Tech:
- K8
- Helm
sliding-puzzle/
├── Chart.yaml
├── values.yaml
├── templates/
│   ├── frontend/
│   │   ├── frontend-deployment.yaml
│   │   ├── frontend-service.yaml
│   │   └── _helpers.tpl
│   ├── backend/
│   │   ├── backend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   └── _helpers.tpl
│   ├── nginx/
│   │   ├── nginx-deployment.yaml
│   │   ├── nginx-service.yaml
│   │   └── _helpers.tpl
│   ├── db/
│   │   ├── db-statefulset.yaml
│   │   ├── db-service.yaml
│   │   └── _helpers.tpl
│   └── _helpers.tpl  # Global helpers across the entire chart

backend/
├── go.mod                  # Go module file
├── go.sum                  # Dependency lock file
├── server/
│   └── main.go         # Entry point for your backend server
├── pkg/
│   ├── ai/
│   │   ├── model.go        # AI model and GoMLX-related logic
│   │   ├── train.go        # AI training logic
│   │   └── generation.go   # AI generation handling (load/save generations)
│   ├── db/
│   │   └── db.go           # Database connection and queries
│   ├── puzzle/
│   │   ├── puzzle.go       # Puzzle-specific logic (state validation, moves, etc.)
│   │   └── solver.go       # Logic for solving the puzzle using AI
│   └── api/
│       ├── handlers.go     # HTTP handlers for all API routes
│       └── routes.go       # Routes registration
├── config/
│   └── config.go           # Configuration handling (e.g., DB connection strings, ports)
├── migrations/
│   ├── 001_create_ai_generations.sql # SQL for AI generations table
│   └── 002_create_user_solutions.sql # SQL for user solutions table
└── README.md               # Documentation for the project
