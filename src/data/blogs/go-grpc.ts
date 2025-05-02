import { BlogPost } from "../blog";

const content = `Modern systems like Slack, Netfix, or even Kubernetes handle **real-time communication** very efficiently. Their large and bulky backends are divided into *microservices*. Have you ever wondered how these services communicate among themselves? Chances are that gRPC is behind the magic.



In this blog, let us try to understand how can we implement a minimal Exam Service using gRPC in GoLang covering all types of RPCs: **Unary**, **Server Streaming**, **Client Streaming**, and **Bidirectional Streaming**.

If you already know what you are doing and just want the code, [here ](https://github.com/pixperk/grpc_exam)is the repo.

Before that let us actually try to undestand some basic concepts and simplify the jargon.

Get ready for the complete gRPC guide.

---
## RPC! What's That?

RPC or **Remote Procedural Calls** may sound like a fancy term *but* it's just **calling functions**. Yes! But on other machine.

Imagine you're the client and you want to ask a server: "Hey, what's the score for student ID 42?" RPC lets you do that as if you were calling a normal function, even though that function lives on a totally different system.

![High Level Working of an RPC](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*aKgp33D6-wxUv02bZ4UG5g.png)

Classic RPC systems came before gRPC, but they had a lot of baggage:

- **Inconsistent data formats**: No standard serialization; some used XML, some custom formats — all bulky and slow.
- **Lack of streaming**: Supporting real-time or long-lived communication was hard or impossible.
- **Limited language support**: Often tied to specific ecosystems (like Java RMI or CORBA).
- **Poor tooling**: Little to no auto-codegen — developers had to write boilerplate by hand.
- **Security was manual**: No built-in encryption; you had to manage TLS yourself.
- **Hard to scale**: No multiplexing, no connection reuse — performance didn’t hold up under modern loads.

In contrast, gRPC fixes these issues out of the box — faster, safer, and way easier to use.



---
## gRPC - Google's RPC

gRPC is an open-source RPC framework developed by Google. It's designed to make inter-service communication:



1. Fast (thanks to *HTTP/2*)
2. Type-safe (via *Protocol Buffers*)
3. Streaming-friendly (supports **real-time communication**)

### Okay. What the hell is HTTP/2?
gRPC uses HTTP/2 under the hood. Compared to HTTP/1.1:

- It supports **multiplexing**— multiple requests on one connection.
- Enables **bidirectional streaming** — both client and server can talk at the same time.
- Built-in **header compression** — faster data transfer.

![HTTP/1.1 vs HTTP/2](https://miro.medium.com/v2/resize:fit:1100/format:webp/0*_E6RJpgdjC-75IKC.jpg)

This is how gRPC achieves low-latency real-time communication.

### gRPC vs REST

| Feature | REST | gRPC |
|--------|------|------|
| Data Format | JSON / XML | Protocol Buffers |
| Streaming | Rare / manual | Built-in |
| Transport | HTTP 1.1 | HTTP/2 |
| Speed | Verbose | Compact & fast |
| Developer Experience | Verbose, manual docs | Auto-generated code |

---
## Types of RPC


gRPC supports four types of communication between the client and server. Let’s walk through each of them.

![RPC Types](https://imgs.search.brave.com/RgbfenRKczbmKvWV3rIRWey_BiMli-BzHxVykwPKZcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW9ub3MuY29tL2Rp/Z2l0YWxndWlkZS9m/aWxlYWRtaW4vX3By/b2Nlc3NlZF8vZi8x/L2NzbV9kaWFncmFt/LW9mLXN0cmVhbWlu/Zy13aXRoLWh0dHAy/XzIxMGI5MmVkZWIu/d2VicA)

### 1. Unary RPC (Simple Request-Response)

**Client sends one request → Server sends one response.**

 Think of it like a regular function call.

**Example:**
> "Get me the marks of student with ID \`42\`."

\`\`\`proto
rpc GetMarks(StudentRequest) returns (MarksResponse);
\`\`\`

This is the most common type — perfect for **CRUD-style** operations.

---

### 2. Server Streaming RPC

 **Client sends one request → Server sends a stream of responses.**

The server keeps pushing multiple responses over time.

**Example:**
> "Give me the list of all exam results for semester 6."

\`\`\`proto
rpc StreamSemesterResults(SemesterRequest) returns (stream MarksResponse);
\`\`\`

Useful when the server has a *lot* of data to send — you get results as they’re ready.

---

### 3. Client Streaming RPC

**Client sends a stream of requests → Server sends one final response.**

The client pushes a batch of data, and the server replies after processing it all.

**Example:**
> "Here’s the attendance report of all students in bulk — store it."

\`\`\`proto
rpc UploadAttendance(stream AttendanceEntry) returns (UploadStatus);
\`\`\`

Great for sending logs, metrics, or bulk uploads.

---

### 4. Bidirectional Streaming RPC (Bidi)

**Client and server stream data to each other concurrently.**

 Like a real-time chat where both can talk and listen at the same time.

**Example:**
> "Start a live quiz session — the client sends answers, the server sends questions and scores in real time."

\`\`\`proto
rpc LiveQuiz(stream QuizMessage) returns (stream QuizMessage);
\`\`\`

This is where gRPC *really* shines. Real-time **multiplayer games, collaborative tools, live dashboards** — it’s all possible.

---

## The Last Bit of Jargon - Protocol Buffers

Protocol Buffers or **Protobuf** is a language-neutral, platform-neutral mechanism for serializing structured data — developed by Google.

### It is better than JSON

- JSON is human-readable but **bulky**.
- Protobuf is **compact** and **faster to serialize/deserialize**.
- JSON needs to parse field names like "student_id" every time. Protobuf uses tags (like 1, 2) behind the scenes for **faster lookup**.

### How it works?

- You define your schema using a .proto file.
- The Protobuf compiler (protoc) generates code for your language (e.g., Go, Python, Java).
- That code provides you with methods to encode and decode messages efficiently.

![Working of ProtoBufs](https://utfs.io/f/8azif4ZMinvpJXoiPxD2fKbWMLkIdcu8qs7aVF9ziDlG5rNP)

Example : 

\`\`\`proto
syntax = "proto3";

message StudentRequest {
  string student_id = 1;
}
\`\`\`
---

## Let's Start Building

### Bootstraping
First of all let us bootstrap the project in go.

\`\`\`bash
mkdir grpc_exam
cd grpc_exam
go mod init github.com/pixperk/grpc_exam
\`\`\`
We will install the necessary dependencies (Go plugins for protoc)

\`\`\`bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
\`\`\`
If you do not have the protoc compiler installed, see the installion guide [here](https://protobuf.dev/installation/).

Let's ready our folder structure
\`\`\`bash
├── client/
│   ├── clients/
│   │   ├── unary.go
│   │   ├── server_stream.go
│   │   ├── client_stream.go
│   │   ├── bi_stream.go
│   └── main.go
├── proto/
│   ├── exam.proto
│   └── generated/exampb/
│       ├── exam.pb.go
│       └── exam_grpc.pb.go
├── server/
│   ├── main.go
│   └── servers/
│       ├── unary.go
│       ├── server_stream.go
│       ├── client_stream.go
│       ├── bi_stream.go
│       └── exam_service_server.go
├── utils/
│   └── logger.go
├── go.mod
├── go.sum
└── Makefile
\`\`\`
Let's write our makefile so that we do not have to write long commands everytime and just run \`make <command>\`

\`\`\`Makefile
proto:
	protoc \
		--proto_path=proto \
		--go_out=proto \
		--go-grpc_out=proto \
		proto/*.proto
	@echo "Proto files generated in the 'proto' directory."

server:
	go run server/main.go
	
client_unary:
	go run client/main.go unary
	
client_server:
	go run client/main.go server
	
client_client:
	go run client/main.go client
	
client_bidi:
	go run client/main.go bidi
	
.PHONY: proto server client_unary client_server client_client client_bidi

\`\`\`

The proto command is for generating go code from the proto file.

### Building the unary RPC

In the **exam.proto** file, let us write our Exam Service.

\`\`\`proto
syntax = "proto3";

package exam;

option go_package = "generated/exampb";

service ExamService {
  rpc GetExamResult(GetExamResultRequest) returns (GetExamResultResponse); //unary
}

message GetExamResultRequest {
  string student_id = 1;
  string exam_id = 2;
}

message GetExamResultResponse {
  string student_name = 1;
  string subject = 2;
  int32 marks_obtained = 3;
  int32 total_marks = 4;
  string grade = 5;
}

\`\`\`

Now we run \`make proto\` to generate our go code.
Our code goes inside the proto/generated folder.

In the server/servers/exam_service_server.go define this
\`\`\`go
package servers

import "github.com/pixperk/grpc_exam/proto/generated/exampb"

type ExamServiceServer struct {
	exampb.UnimplementedExamServiceServer
	examData map[string]*exampb.GetExamResultResponse
}

func NewExamServiceServer() *ExamServiceServer {
	data := map[string]*exampb.GetExamResultResponse{
		"123_math101": {
			StudentName:   "John Doe",
			Subject:       "Math 101",
			MarksObtained: 95,
			TotalMarks:    100,
			Grade:         "A+",
		},
		"456_phy101": {
			StudentName:   "Jane Smith",
			Subject:       "Physics 101",
			MarksObtained: 88,
			TotalMarks:    100,
			Grade:         "A",
		},
	}

	return &ExamServiceServer{
		examData: data,
	}
}

\`\`\`

Let's design the server and the client for this.
First let's code the main.go inside the server and the client. The main.go's inside the server and client will drive them respectively.

**server/main.go** : 
\`\`\`go
package main

import (
	"net"

	"log/slog"

	"github.com/pixperk/grpc_exam/proto/generated/exampb"
	"github.com/pixperk/grpc_exam/server/servers"

	"github.com/pixperk/grpc_exam/utils"
	"google.golang.org/grpc"
)

func main() {
	utils.InitLogger(true)
    //Spin up a TCP Server
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		slog.Error("failed to listen", "error", err)
	}

    //New gRPC server instance
	s := grpc.NewServer()

	//Register services
	exampb.RegisterExamServiceServer(s, servers.NewExamServiceServer())
                
 // Start serving gRPC requests
	if err := s.Serve(lis); err != nil {
		slog.Error("failed to serve", "error", err)
	}

}

\`\`\`

**client/main.go** : 
\`\`\`go
package main

import (
	"log/slog"
	"os"

	"github.com/pixperk/grpc_exam/client/clients"
	"github.com/pixperk/grpc_exam/proto/generated/exampb"
	"github.com/pixperk/grpc_exam/utils"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// Initialize logger (true = debug mode)
	utils.InitLogger(true)

	// Create a gRPC client connection to the server
	conn, err := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		slog.Error("Failed to connect to server", "error", err)
		return
	}
	defer conn.Close()

	// Create a client for the ExamService
	client := exampb.NewExamServiceClient(conn)

	clients.Unary(client)
	
}

\`\`\`

Now let's write the unary server and unary client

**Unary Server (server/servers/unary.go)** : 
\`\`\`go
package servers

import (
	"context"
	"fmt"

	"github.com/pixperk/grpc_exam/proto/generated/exampb"
)

func (s *ExamServiceServer) GetExamResult(ctx context.Context, req *exampb.GetExamResultRequest) (*exampb.GetExamResultResponse, error) {
	key := fmt.Sprintf("%s_%s", req.StudentId, req.ExamId)
	if result, ok := s.examData[key]; ok {
		return result, nil
	} else {
		return nil, fmt.Errorf("exam result not found for student ID %s and exam ID %s", req.StudentId, req.ExamId)
	}
}

\`\`\`

Pretty easy right? 
Similarly **Unary Client(client/clients/unary.go)** : 

\`\`\`go
package clients

import (
	"context"
	"fmt"
	"time"

	"github.com/pixperk/grpc_exam/proto/generated/exampb"
)

func Unary(client exampb.ExamServiceClient) {

	fmt.Println("Enter student ID and exam ID (e.g., 123 math101):")
	var studentID, examID string
	fmt.Scanf("%s %s", &studentID, &examID)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	resp, err := client.GetExamResult(ctx, &exampb.GetExamResultRequest{StudentId: studentID, ExamId: examID})
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	fmt.Printf("Student Name: %s\n", resp.StudentName)
	fmt.Printf("Subject: %s\n", resp.Subject)
	fmt.Printf("Marks Obtained: %d out of %d\n", resp.MarksObtained, resp.TotalMarks)
	fmt.Printf("Grade: %s\n", resp.Grade)
	fmt.Println("Unary RPC call completed successfully.")

}

\`\`\`

This is just basic function calls and simple go programming.

You can see the results by running \`make server\` and \`make client\` in two separate terminals.

Server Streaming and Client streaming are easy given you can handle streams in Go. Let's jump to bidirectional streaming and skim through streaming as well.

---
### Building the Bidirectional RPC

In the exam.proto file add

\`\`\`proto
rpc LiveExamQuery(stream GetExamResultRequest) returns (stream GetExamResultResponse); //bidi streaming
\`\`\`
In the **servers/bi_stream.go** : 

\`\`\`go
package servers

import (
	"fmt"
	"io"

	"github.com/pixperk/grpc_exam/proto/generated/exampb"
)


func (s *ExamServiceServer) LiveExamQuery(stream exampb.ExamService_LiveExamQueryServer) error {
	for {
		// Receive a stream request from the client
		req, err := stream.Recv()
		if err != nil {
			// If the client closes the stream (EOF), stop the loop gracefully
			if err == io.EOF {
				return nil
			}
			// If another error occurred, return it
			return err
		}

		key := fmt.Sprintf("%s_%s", req.StudentId, req.ExamId)

		result, ok := s.examData[key]

		// If result is not found, send a default "Not Found" response
		if !ok {
			err := stream.Send(&exampb.GetExamResultResponse{
				StudentName:   "N/A",
				Subject:       req.ExamId,
				MarksObtained: 0,
				TotalMarks:    0,
				Grade:         "Not Found",
			})
			if err != nil {
				return err // Stop on send error
			}
			continue
		}

		// If result is found, send it back to the client over the stream
		if err := stream.Send(result); err != nil {
			return err // Stop on send error
		}
	}
}
\`\`\`

This function:
- Receives multiple exam queries from the client.
- Immediately responds to each with a result (if found).
- Continues until the client stops sending (EOF).

### Go Channels

Let's understand a bit about channels before proceeding to bi-directional client.

Go channels are like pipes used to **communicate between goroutines** (lightweight threads). They help synchronize data exchange safely without using mutexes.

*Create a channel:*
\`\`\`go
done := make(chan struct{}) // unbuffered channel of empty struct
\`\`\`
*Send to a channel:*
\`\`\`go
done <- struct{}{}
\`\`\`
*Receive from a channel:*
\`\`\`go
<-done
\`\`\`
Channels block until something is sent or received, making them perfect for goroutine coordination.

Read more [here](https://dev.to/eyo000000/a-straightforward-guide-for-go-channel-3ba2).


### Now back to bi-dir client

\`\`\`go
package clients

import (
	"bufio"
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"strings"

	"github.com/pixperk/grpc_exam/proto/generated/exampb"
)

func BiDirectional(client exampb.ExamServiceClient) {
	//body
}

\`\`\`

Let's discuss in bits about what goes on here (the function body) : 

\`\`\`go
stream, err := client.LiveExamQuery(context.Background())
done := make(chan struct{})

\`\`\`

- LiveExamQuery opens a bidirectional stream with the server.
- done channel is created to signal when the receiver goroutine is finished.

\`\`\`go
go func() {
		for {
			res, err := stream.Recv() //receive stream from the server
			if err != nil {
				if err == io.EOF {
					break
				}
				log.Fatalf("Error receiving response: %v", err)
				break
			}
			fmt.Printf("🎓 %s | %s: %d/%d (%s)\n",
				res.StudentName, res.Subject, res.MarksObtained, res.TotalMarks, res.Grade)

			fmt.Print("Enter student_id and exam_id (or 'exit'): ")
		}
		close(done)

	}()

	// Initial prompt
	fmt.Print("Enter student_id and exam_id (or 'exit'): ")

\`\`\`

- This goroutine listens for server responses and prints them.
- It runs in the background while the main thread handles user input.

\`\`\`go
reader := bufio.NewReader(os.Stdin)
//Send data
	for {
		line, _ := reader.ReadString('\n')
		line = strings.TrimSpace(line)
		if line == "exit" {
			stream.CloseSend()
			break
		}
		parts := strings.Fields(line)
		if len(parts) != 2 {
			fmt.Println("⚠️  Usage: <student_id> <exam_id>")
			continue
		}
		req := &exampb.GetExamResultRequest{
			StudentId: parts[0],
			ExamId:    parts[1],
		}
		if err := stream.Send(req); err != nil {
			log.Printf("send error: %v", err)
			break
		}
	}

\`\`\`

- Reads user input (student_id exam_id).
- Sends each request to the server via the stream.
- If exit is typed, the client closes the send stream.

\`\`\`go
<-done
fmt.Println("👋 Session ended.")

\`\`\`

- Waits for the receiver goroutine to finish using the done channel.
- Ensures the program exits only after all communication is done.

Now we can test the bidirectional RPC using the make commands like above.

---
## Wrapping Up


If you want to refer to any code or see the server or client streaming, [this](https://github.com/pixperk/grpc_exam) is the repo. 

Building a gRPC-based system with both server-side and client-side streaming is a great way to explore high-performance communication between services. Throughout this project, we learned how to:

1. Define robust proto files and generate language-specific code
2. Implement server-side and client-side streaming using gRPC
3. Handle bidirectional communication effectively
4. Structure the project for maintainability and scalability

Whether you're a beginner exploring RPC concepts or someone looking to implement efficient microservices communication, I hope this project offers a helpful starting point. 

Thanks for reading! Let me know if you have any questions down in the comments.
`;

export const goGrpc : BlogPost  = {
    slug: "learn-grpc-completely-in-golang",
    title: "Learn gRPC COMPLETELY in GoLang",
    date: "April 25, 2025",
	externalLinks : {
		devTo : "https://dev.to/pixperk/learn-grpc-completely-from-unary-to-bi-directional-rpcs-2dnl"
	},
    excerpt: "Learn how to implement a minimal Exam Service using gRPC in GoLang, covering all types of RPCs: Unary, Server Streaming, Client Streaming, and Bidirectional Streaming.",
    tags: ["Go", "gRPC", "Microservices", "Backend"],
    coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F5rgzuo6bs45szhtlbwsi.png",
    content
}