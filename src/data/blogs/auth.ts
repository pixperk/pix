import { BlogPost } from "../blog";

export const  auth_blog : BlogPost =  {
    slug: "the-definitive-auth-guide-for-backend-developers",
    title: "The Definitive Auth Guide for Backend Developers",
    date: "May 22, 2025",
    excerpt: "Exploring Backend Auth: Key Concepts from Bearer Tokens and JWTs to Token Security and Session Protection.",
    tags: ["Auth", "Backend", "Jwt", "Security", "Paseto"],
    externalLinks : {
        devTo : "https://dev.to/pixperk/the-definitive-auth-guide-for-backend-developers-2ja0",
        hashnode : "https://coreloop.hashnode.dev/the-definitive-auth-guide-for-backend-developers",
        medium : "https://medium.com/@pixperk/the-definitive-auth-guide-for-backend-developers-3bcef14dbf67",
       
    },
    coverImage: "https://cdn.hashnode.com/res/hashnode/image/upload/v1747916301371/62410eed-b3e4-4a39-a586-fe5bbf40b8fe.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    content: `**Most devs treat authentication like a checkbox -** *“yep, users log in, done.”*

**Newsflash:** *that lazy mindset is how apps get hacked and data gets leaked.*

*If you don’t understand how auth really works, you’re building a house with no locks.*

**Authentication** is simply the process of *verifying who someone is*. When you log into an app, it checks your identity to make sure you’re actually you, and not some random trying to sneak in.

It’s the foundation for everything secure in your system - **without solid authentication, nothing else matters.**

This blog is gonna be **long** because auth isn’t simple, but it’s gonna be **useful**.

We’ll break down:

* **stateful vs stateless**
    
* **bearer tokens**
    
* **JWT deep dives** and how to build them in Go
    
* why **PASETO** might be the better option
    
* token rotation with **access and refresh tokens**
    
* and how to handle **session hijacking**
    

No fluff, no hype. Just everything you need to build auth that *works* and *stays secure.*

## Stateful vs Stateless Authentication

There are two paradigms to the game of authentication

1 - **Stateful** - “*I will always remember you*”

2- **Stateless** - “*Prove who tf you are each and every time*”

Let’s dive deep, explore these shenanigans, cut the jargon and understand all the stuff which will serve as foundation for further implementations.

### Stateful Auth

The minimal flow for Stateful auth is as follows :

1. User logs in.
    
2. Server generates a unique **Session ID** for that user and store it usually **in memory** (Redis, Memcached, *maybe* a DB).
    
3. This Session ID is sent to the client via **cookie**.
    
    *In case, you have forgotten what a cookie is, it is a choco chip coated… JK, it is a tiny piece of data your browser stores and automatically sends with every request*
    
4. On each request from the client, the cookie is sent → session ID matched (with the one stored on server) → user authenticated.
    

Note!

Session IDs need to be regenerated after login to avoid session fixation attacks where an attacker forces a known session ID on the user before login.

> So Stateful Auth is your **server remembering you**, *just by your ID*.

![Stateful Authentication](https://cdn.hashnode.com/res/hashnode/image/upload/v1747904454124/7580dc18-bf30-4c20-94c2-568dd37cbe9c.png)

### Stateless Auth

Stateless Auth is how you plug in auth into modern web. Let’s get a basic idea :

**Stateless auth** means the server doesn’t store anything. Instead, the **client holds the proof** of identity - usually a **token** (JWT, PASETO, etc.).

How does it flow?

1. User logs in.
    
2. Server generates a **signed token** (e.g., JWT) with a payload to store stuff like user id, email etc.
    
3. Client stores it (localStorage - *don’t do this please*, HTTP-only cookie).
    
4. On every request, client sends the token → server verifies signature → user authenticated.
    

*Stateless tokens expire. For long sessions, implement a refresh token mechanism stored securely (preferably in an HTTP-only cookie).*

Rotate refresh tokens on use.

Chill for now, if you do not get this, we’ll see this stuff later in detail.

> Stateless auth is like walking around with a signed passport : nobody needs to remember you.

![Stateless Authentication](https://cdn.hashnode.com/res/hashnode/image/upload/v1747905500687/865c1e2c-9784-43f9-9367-06c1eeb0215a.png)

### The Difference

| **Aspect** | **Stateful Authentication** | **Stateless Authentication** |
| --- | --- | --- |
| **Data Theft Risk** | Safer : Only the server knows session details, the token is just a reference. | Riskier : All session data is in the token, and it’s not encrypted by default. |
| **Resource Usage** | Heavier : Requires frequent access to session storage (e.g., Redis, DB). | Lightweight : All info is in the token; no external lookup needed. |
| **Implementation Complexity** | Higher : Needs infrastructure for session storage and persistence. | Simpler : No storage needed; token carries everything. |
| **Scalability** | Needs effort : Scaling storage with services is necessary. | Easy : Any instance can verify the token without central storage. |
| **Security Across Services** | Secure : Only the auth service can read session data from the store. | Risky : All services must share the same secret key; compromise one, risk all. |
| **Token Size** | Small : Token is just a session ID; payload lives on the server. | Can be large : Token holds all auth data, which increases payload size. |
| **Granular Access Control** | Flexible : Only the required parts of data can be shared with each service. | Limited : All services decode the full session payload. |
| **Session Revocation** | Easy : Simply delete the session from storage. | Hard : Once issued, tokens remain valid until they expire. |
| **Session Data Modification** | Yes : Server can update session data on the fly. | No : Token data is fixed until a new token is issued. |
| **Single Sign-On (SSO)** | Easy : Centralized session makes it simple to implement SSO. | Tougher : Each service must be able to parse the token independently. |

### When to Use What?

**Use Stateful when:**

* You need **real-time control** (revoking, role changes)
    
* You're building a traditional web app (SSR-heavy)
    
* You want full control over the session lifecycle
    

**Use Stateless when:**

* You're building an **API-first**, **mobile-first**, or **microservice** app
    
* You plan to scale horizontally or use serverless
    
* You’re okay with a refresh-token mechanism
    

---

## Authorization and Bearer Tokens

Session-based authentication is stateful, while token-based authentication is stateless - and that's exactly why it's the **standard for modern web apps**. In this blog, we'll focus on **token-based auth**, since it's the *backbone* of scalable systems today. But first, let’s get our fundamentals straight: What exactly is **authorization**?

**Authorization** is about answering one question: *Now that we know who you are, what are you allowed to do?*

Once a user is authenticated, your system needs to enforce boundaries. Think of an e-commerce app where you might have two roles: \`customer\` and \`seller\`. A customer can browse and buy, but shouldn’t be able to list new products. And a seller? Sure, they can manage their own listings, but they definitely shouldn’t be able to change the price of someone else’s product.

That’s authorization, setting the rules of engagement *after* identity has been verified.

![Authorization](https://cdn.hashnode.com/res/hashnode/image/upload/v1747904724526/ab99149a-5fbf-42ea-a1fb-3ac1671399fd.jpeg)

### So, what’s a Bearer Token now?

A **Bearer Token** is like a key - it gives you access to a resource. When you send a request, the server checks the token and decides if you’re allowed in.

*Whether you’re trying to drop the price of your own product or sneakily update your competitor’s.*

Bearer token is typically passed via the **Authorization** header in the following format :

\`Authorization: Bearer <token>\`

**⚠️ Security Note:**

Bearer tokens are **like cash**:

* Anyone who gets the token can use it.
    
* They should be transmitted **only over HTTPS**.
    
* They should be **short-lived**, **revocable**, or **bound** (like in OAuth2’s DPoP).
    

**Are Bearer Tokens always JWTs?**

**Nope.** JWTs are a *type* of bearer token, but not all bearer tokens are JWTs. Some are:

* **Opaque tokens**: Random strings (UUIDs, hashes), stored and mapped in a backend DB.
    
* **Reference tokens** (in OAuth2): Tiny strings that reference data stored on the server.
    
* **JWTs** (JSON Web Tokens): Self-contained tokens that store claims directly and are cryptographically signed.
    

### There are other types of tokens too.

Not all tokens are Bearer tokens. Let’s take a quick tour of some other important ones:

1. **Bearer Token (Generic)**
    

* Used in: OAuth2, most APIs
    
* Can be a JWT, PASETO, or opaque
    
* Passed via \`Authorization\` header
    

2. **MAC Token (Message Authentication Code)**
    

* Adds request signing: Includes parts like URI, timestamp, etc.
    
* More secure than Bearer (but more complex)
    
* Rare in modern APIs
    

3. **DPoP (Demonstration of Proof-of-Possession)**
    

* An upgrade to Bearer: binds the token to a key, so it can’t be reused if stolen
    
* Becoming popular in OAuth 2.1
    

4. **PKCE (Proof Key for Code Exchange)**
    

* Used in OAuth flows to prevent auth code interception
    
* Works with public clients (like mobile apps)
    

5. **Refresh Token**
    

* Long-lived token used to get new short-lived access tokens
    
* Usually used *with* bearer tokens or JWTs
    
* We will take a look at this later in detail
    

---

## Crypto 101

Before we move onto JWTs, let’s take a brief pause and understand some cryptography concepts which help keeping these tokens authentic. Because if you don’t understand *how* they’re signed, you’ll be a sitting duck for all the sneaky vulnerabilities waiting to pounce.

### Why Do We Even Sign Tokens?

Imagine you write a note and hand it to someone. What if that note gets swapped with a fake one? Signing is like putting your personal wax seal on the note - it proves you authored it and it hasn’t been tampered with.

With JWTs, signing is the cryptographic wax seal that guarantees the token’s integrity and authenticity. Without it? Anyone could mess with your payload, pretend to be legit, and wreak havoc.

### Symmetric vs. Asymmetric Algorithms

Signing algorithms come in two main flavors:

**1\. Symmetric (Shared Secret):**

Think of this as a secret handshake between two people who both know the same password. Both the creator of the token and the verifier share *one secret key*. This key is used to both create and verify the signature.

* Example: \`HS256\` - HMAC with SHA-256 hashing
    
* Fast, simple, efficient
    
* But here’s the catch: if the secret leaks, *everyone* can forge tokens.
    

**2\. Asymmetric (Public/Private Key):**

Now imagine you have a locked mailbox only *you* can open (private key), but anyone can drop letters in it (public key). This setup uses two keys: the **private key** signs the token, and the **public key** verifies it.

* Examples: \`RS256\` (RSA), \`ES256\` (Elliptic Curve)
    
* More complex but more secure in distributed systems
    
* Public keys can be shared freely without risking the private key
    
* Slower than symmetric, but worth it for big apps
    

### The Role of Hashing and HMAC

The heart of token signing is hashing - it is like a fingerprint generator. Give some data (say, a string), the hash function returns a unique fixed size output. Even the tiniest change in the input completely changes the output hash - like flipping a single pixel in your fingerprint and getting a whole new identity.

One of the most commonly used hash functions is **SHA-256** (Secure Hash Algorithm 256-bit), which always produces a 256-bit (32-byte) hash output.

Here’s what makes hashes powerful:

* **One-way function** : You can compute the hash of data easily, but you can’t reverse it to get the original data.
    
* **Sensitive to changes** : Change one bit of input and the output is radically different.
    

But here's the problem: **Hashing alone ≠ security**. If someone knows your input, they can hash it too and pretend it’s legit.

Enter: **HMAC (Hash-Based Message Authentication Code)**

HMAC solves this. It's like giving your hash function a secret weapon - **a secret key**.

Instead of just hashing the message, HMAC combines:

\`HMAC(secret key, message)\`

This means **only someone with the correct secret key** can produce the correct HMAC signature.

It works like this (simplified flow):

1. You take your message.
    
2. You mix it with a secret key in a specific way (padding, XORing, etc.).
    
3. You run it through a hash function like SHA-256.
    
4. The output is a **keyed hash** - the HMAC.
    

Now, anyone who receives your message and has the same secret key can recompute the HMAC and check if it matches. If it does: message was legit and untampered.

When you sign a JWT using \`HS256\`, it’s literally using:

\`HMAC-SHA256(secret key, base64(header) + "." + base64(payload))\`

So if the token was altered even slightly, the signature won’t match when verified - and you immediately know something shady went down.

But here’s the thing:

* If your **secret key is weak or leaked**, an attacker can compute their own HMACs and forge tokens.
    
* If your server doesn’t verify the signature correctly, you’re wide open to manipulation.
    

---

## JWT - A Deep Dive

After surviving the Crypto 101, I think we should move onto dissecting JSON Web Tokens (JWTs). A clean JWT implementation in GoLang will follow this.

A **JWT** is a compact, URL-safe token format used to securely transmit information between two parties. It consists of three base64url-encoded parts, separated by dots (\`.\`):

\`<Header>.<Payload>.<Signature>\`

Let’s break down the role of each piece :

### Header

The header is like the envelope : it tells the receiver what kind of message this is and how it’s sealed.

Example:

\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

* \`alg\`: the signing algorithm used, e.g., HS256 (HMAC with SHA-256) or RS256 (RSA with SHA-256).
    
* \`typ\`: the type of token , typically \`JWT\`.
    

This header is Base64URL-encoded before being used in the signature process.

### Payload

The payload is the actual data , the message you want to send. It contains **claims**, which are statements about the subject (user, client, etc.).

Example payload:

\`\`\`json

{
  "sub": "user_abc123",
  "name": "Yashaswi",
  "role": "admin",
  "iat": 1716351700,
  "exp": 1716355300
}

\`\`\`

**There are three types of claims:**

* **Registered claims** – standard fields like \`sub\` (subject), \`iat\` (issued at), \`exp\` (expiration), \`iss\` (issuer), \`aud\` (audience).
    
* **Public claims** – user-defined but meant to be collision-free (usually namespaced).
    
* **Private claims** – totally custom to your app (\`role\`, \`plan\`, \`tier\`, etc.).
    

**Important**: The payload is **not encrypted**. Anyone can decode it with a Base64 decoder. That means:

> Never store sensitive data like passwords, tokens, or PII here.

### Signature

The signature is the **cryptographic seal**. It ensures the token hasn’t been tampered with.

If you’re using \`HS256\` (symmetric HMAC), here’s how the signature is created:

\`\`\`plaintext

HMAC-SHA256(
  secret,
  base64urlEncode(header) + "." + base64urlEncode(payload)
)
\`\`\`

If you’re using \`RS256\` (asymmetric RSA), the private key is used to sign, and the public key to verify.

The signature **guarantees integrity and authenticity**. If someone modifies the payload, the signature breaks. If someone doesn’t have the secret (or private key), they can’t forge a valid token.

![JWT format](https://cdn.hashnode.com/res/hashnode/image/upload/v1747904788014/18afe30c-1568-40b5-a320-2c492045fb85.png)

### Why JWTs Are Powerful

* **Stateless**: No server-side session storage needed. Just validate and go.
    
* **Portable**: You can pass them across APIs, domains, or services easily.
    
* **Tamper-proof**: Thanks to the cryptographic signature.
    
* **Self-contained**: All the info needed to process the request is in the token itself.
    

Perfect for:

* REST APIs
    
* Microservices
    
* Mobile apps
    
* OAuth2 flows
    

### But JWTs Aren’t Magic - Use With Caution

They have caveats:

**❗ Expiration Matters**

Long-lived tokens are dangerous and short-lived tokens are very annoying for the users. Find the sweet spot. Rotate tokens using **refresh tokens**.

**❗ Signature Doesn’t Mean Encryption**

People confuse the two all the time. JWTs are **not encrypted by default**. Anyone can decode them. Use **JWE (JSON Web Encryption)** or transmit them securely via HTTPS.

**❗ Revocation is Hard**

Once issued, JWTs live until they expire. You can’t just “log out” someone unless you maintain a blacklist or use short expiration with refresh tokens.

**❗ Beware of “alg: none”**

This infamous vulnerability allowed attackers to forge tokens by passing \`"alg": "none"\` in the header - which some libraries didn’t verify properly. Always validate the algorithm on the server side.

---

## Implementing JWT Authentication in Go

Now that we have enough idea about what is JWT and how it looks, let’s implement JWT auth in **GoLang**.

Let us start by creating the **payload struct**.

\`\`\`go
type Payload struct {
	ID        uuid.UUID \`json:"id"\`
	Username  string    \`json:"username"\`
	IssuedAt  time.Time \`json:"issued_at"\`
	ExpiredAt time.Time \`json:"expired_at"\`
}
\`\`\`

You can extend this struct with fields like \`Email\`, \`Roles\`, or whatever your use case needs. But keep the token lean to avoid payload bloat.

We’ll define two error constants that we’ll use later.

\`\`\`go
var (
	ErrExpiredToken = errors.New("token has expired")
	ErrInvalidToken = errors.New("token is invalid")
)
\`\`\`

Here’s a constructor to initialize the Payload struct:

\`\`\`go
func NewPayload(username string, duration time.Duration) (*Payload, error) {
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	payload := &Payload{
		ID:        tokenID,
		Username:  username,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}

	return payload, nil
}
\`\`\`

And finally an implementation over payload to check whether the token is valid:

\`\`\`go
func (payload *Payload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}

	return nil
}
\`\`\`

> Note: jwt-go will call this Valid() function internally when verifying tokens - but YOU must return meaningful errors inside it, like we did with expiry. Don’t just YOLO it.

You can also move that expiry check **into** the \`VerifyToken\` logic directly if you want to be explicit, but this is fine as long as you call it via \`jwt.ParseWithClaims\`

That’s it. Our payload struct and implementations over it are ready.

Next we will hop onto making a general ‘\`maker\`’ interface, whose methods our \`*jwtMaker*\` will implement. We will reuse the \`maker\` interface later to implement \`*pasetoMaker*\` as well.

This is how our maker interface will look like :

\`\`\`go
type Maker interface {
	CreateToken(username string, duration time.Duration) (string, error)
	VerifyToken(token string) (*Payload, error)
}
\`\`\`

Now let’s jump into the *meaty* part and build the \`jwtMaker\`.

\`\`\`go
const minSecretKeySize = 32

type JWTMaker struct {
	secretKey string
}

func NewJWTMaker(secretKey string) (Maker, error) {
	if len(secretKey) < minSecretKeySize {
		return nil, fmt.Errorf("invalid key size : must be at least %d characters", minSecretKeySize)
	}
	return &JWTMaker{secretKey}, nil
}

\`\`\`

We start by making a \`JWTMaker\` struct which consists of a secretKey field used to sign (and possibly verify which depends on symmetric/asymmetric key algorithm). Inside the constructor, if the length of the secret key is less than the minimum key size, we return an error early. Else we instantiate the interface with a \`JWTMaker\` struct instance and return no error.

Now this \`JWTMaker\`is required to implement two methods, CreateToken and VerifyToken. Let’s implement them. We will be using this JWT library : [\`github.com/golang-jwt/jwt/v5\`](http://github.com/golang-jwt/jwt/v5)

**CreateToken :**

\`\`\`go
func (maker *JWTMaker) CreateToken(username string, duration time.Duration) (string, error) {
	payload, err := NewPayload(username, duration)
	if err != nil {
		return "", err
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, payload) //comes from the jwt lib
	return jwtToken.SignedString([]byte(maker.secretKey))
}
\`\`\`

We accept username and time duration as params and construct our payload using these. Then we create a new JWT using HS256 algorithm and return it after signing it with our secret key.

**VerifyToken :**

Okay, things get interesting here. Now we need to verify the token and decode the embedded payload. Let’s take a look over the whole code first, then understand it bit by bit.

\`\`\`go
func (maker *JWTMaker) VerifyToken(token string) (*Payload, error) {
	keyFunc := func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, ErrInvalidToken
		}
		return []byte(maker.secretKey), nil
	}
	jwtToken, err := jwt.ParseWithClaims(token, &Payload{}, keyFunc)
	if err != nil {
		verr, ok := err.(*jwt.ValidationError)
		if ok && errors.Is(verr.Inner, ErrExpiredToken) {
			return nil, ErrExpiredToken
		}
		return nil, ErrInvalidToken
	}
	payload, ok := jwtToken.Claims.(*Payload)
	if !ok {
		return nil, ErrInvalidToken
	}

	return payload, nil
}
\`\`\`

Here’s our flow of verifying the token :

* Confirm HMAC sig method (protect from alg-switch)
    
* Parse token with secret
    
* Handle expiration separately
    
* Extract user claims safely
    
* Reject all else with fire
    

We accept the token as param , then :

\`\`\`go
	keyFunc := func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, ErrInvalidToken
		}
		return []byte(maker.secretKey), nil
	}
\`\`\`

keyFunc is a **callback function** required by \`jwt.ParseWithClaims\`. Its job is to return the secret key used to sign the token. We first check if the token was signed using **HMAC (HS256/HS512)**. It prevents someone from switching the algorithm to, say, \`RS256\`, and trying to mess with you. If the algorithm doesn’t match, we return an invalid token error. If everything’s cool, return the actual **signing secret** so the JWT lib can verify the signature.

\`\`\`go
	jwtToken, err := jwt.ParseWithClaims(token, &Payload{}, keyFunc)
	if err != nil {
		verr, ok := err.(*jwt.ValidationError)
		if ok && errors.Is(verr.Inner, ErrExpiredToken) {
			return nil, ErrExpiredToken
		}
		return nil, ErrInvalidToken
	}
\`\`\`

Now we parse the token from the client into the empty Payload struct, and also pass keyFunc as param for validating the signature. If parsing fails, check if the error is a **ValidationError** (e.g. expired, malformed, etc.). If the *inner* error was due to token expiration, return a clean \`ErrExpiredToken\`. For any other error, return \`ErrInvalidToken\`.

\`\`\`go
	payload, ok := jwtToken.Claims.(*Payload)
	if !ok {
		return nil, ErrInvalidToken
	}

	return payload, nil
}
\`\`\`

Extract the claims and assert they are of type \`Payload\`. If type assertions fail, bail. Otherwise, token is valid, signed by you, not expired, and has a clean payload. Send it to the handler.

Now our JWTMaker is ready. We can use the createToken in our login api and give out an access token on logging in. In the middleware for protected resources, we will check for the Bearer Token in the Authorization Header, and use verifyToken for that.

Below is the authorization middleware example (in Gin).

\`\`\`go
func authMiddleware(tokenMaker token.Maker) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// Get the Authorization header
		authorizationHeader := ctx.GetHeader(authorizationHeaderKey)
		if len(authorizationHeader) == 0 {
			err := errors.New("authorization header not provided")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// Expecting format: "Bearer <token>"
		fields := strings.Fields(authorizationHeader)
		if len(fields) < 2 {
			err := errors.New("invalid authorization header format")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// Check if type is Bearer
		authorizationType := strings.ToLower(fields[0])
		if authorizationType != authorizationTypeBearer {
			err := errors.New("unsupported authorization type")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// Verify token
		accessToken := fields[1]
		payload, err := tokenMaker.VerifyToken(accessToken)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		// Save payload to context
		ctx.Set(authorizationPayloadKey, payload)
		ctx.Next()
	}
}

\`\`\`

These are constants for Bearer Token and Authorization Header :

\`\`\`go
const (
	authorizationHeaderKey  = "authorization"
	authorizationTypeBearer = "bearer"
	authorizationPayloadKey = "authorization_payload"
)
\`\`\`

That’s it! That is our JWT implementation in Go.

---

## PASETO - The Anti JWT

PASETO (Platform-Agnostic Security Token) is a secure-by-default, minimalistic, and less error-prone alternative to JWT.

Here’s the format of a typical PASETO token :

\`<version>.<purpose>.<base64url-encoded-payload>\`

### Let’s zoom into the **three core components** of any PASETO token:

Version

The **first part** of the PASETO token is the **version identifier** - it tells you *which set of cryptographic primitives* is being used.

| Version | Crypto Stack | Status | Use Case |
| --- | --- | --- | --- |
| **v1** | AES-CTR + HMAC / RSA-PSS | Deprecated | OG version |
| **v2** | XChaCha20-Poly1305 / Ed25519 | ✅ Stable | Widely used |
| **v3** | AES-CTR + HMAC / ECDSA | ✅ Stable | FIPS-compliant |
| **v4** | XChaCha20-Poly1305 / Ed25519 (newer implementations) | ✅ Latest | Recommended going forward |

v2 and v4 are your go-to for modern apps.

If you don’t need US government FIPS compliance, skip v3.

### Purpose

The **second part** tells you the **intent** of the token:

* \`local\` → **Encrypted** token (confidentiality)
    
* \`public\` → **Signed** token (integrity)
    

**Why does this matter?**

Because you **can’t mix & match**. PASETO makes the purpose **explicit**. It avoids the confusion JWT has with \`"alg": none\` or \`"alg": HS256"\`.

**→** \`local\` : Encrypted (Symmetric Key):

\`v4.local...\`

* Nobody can read the payload unless they have the key.
    
* Think: password vaults, medical data, PII.
    

→ \`public\` — Signed (Asymmetric Key)

\`v4.public...\`

* Anyone can **verify** the payload was created by your server.
    
* Useful for access tokens — verify without decrypting.
    

### Payload

It remains the same as JWT.

> If you're using \`public\` mode, **don’t put sensitive info** in the payload - it's **not encrypted**, just signed.

### Sample PASETO (Encrypted)

\`v4.local.Y2hhY2hhMjBfZW5jcnlwdGVkX3N0dWZmLmRhdGEuZ29lc19oZXJl\`

* Version: \`v4\`
    
* Purpose: \`local\` (encrypted)
    
* Payload: Encrypted JSON like \`{ "user_id": "123", "exp": ... }\`
    

Can you decode it?

Nope. Unlike JWT, **you can't base64 decode** and peek inside unless you have the secret key

### Why PASETO over JWT?

JWT’s spec is just too **flexible**. This flexibility can sometimes become a *liability.*

Here’s why JWTs can be potentially dangerous and why I personally prefer PASETO.

**The** \`alg\` field is the vulnerability magnet in JWT.

* JWT lets you **choose** your signing algorithm and some servers **blindly trust** the \`alg\` field. *Real attacks have occurred* by switching from \`"RS256"\` to \`"none"\` , bypassing signature checks.
    
* JWT supports multiple algorithms: \`HS256\`, \`RS256\`, \`ES256\`, etc. If you sign with \`RS256\` (asymmetric), but verify with \`HS256\` (symmetric), then an attacker can craft a token using the **public key** (intended only for verification) as the **secret** (for HMAC), and yeah that will lead to **token forgery.**
    

**Many JWT libraries have *inconsistent* implementations. Not all :**

* Validate claims properly
    
* Enforce expiration
    
* Check audience or issuer
    
* Reject malformed tokens
    

JWT supports **both signed (**\`JWS\`) and encrypted (\`JWE\`) formats. But many developers:

* Don't encrypt sensitive data
    
* Misunderstand the difference
    
* End up leaking info in a "secure" token
    

On the contrary, PASETO is better. PASETO was designed **after** JWT, learning from its chaos.

* PASETO does not have any \`alg\` field.
    
* Every PASETO version has **predefined algorithms, safe defaults and no flexibility** (not a limitation).
    
* PASETO tokens have clear format and no headers and hence no chances of manipulation.
    
* It is encrypted by default (local tokens).
    
* There are **no ambiguous token types** in PASETO:
    
    \`vX.public\` = signed token
    
    \`vX.local\` = encrypted token
    

All in all, there is less surface area to screw things up.

| Feature | JWT | PASETO |
| --- | --- | --- |
| Configurable algs | ✅ | ❌ |
| Encrypted by default | ❌ | ✅ (\`local\`) |
| Prone to alg confusion | ✅ | ❌ |
| Secure defaults | ❌ | ✅ |
| Public-key safe | Depends | ✅ |
| Dev Footgun Potential™ | 🔥🔥🔥 | 🧊 |

![JWT vs. PASETO](https://cdn.hashnode.com/res/hashnode/image/upload/v1747904850064/b093c238-02c1-4aff-aa66-1288eaf171fa.png)

And for the PASETO implementation in Go, it similar to if not simpler than the JWT implementation. In my project, Vaultify, I have implemented PASETO auth. You can check out the code [here](https://github.com/pixperk/vaultify/tree/master/internal/auth) :

That’s it about PASETO. PASETO is just JWT but won’t give you nightmares.

---

## Access Tokens, Refresh Tokens and Token Rotation

### What is an Access Token ?

An access token is a **digital key** which facilitates *seamless* access to the resources. The JWTs or PASETO we saw until now are all access tokens. This is what is passed in the Authorization header with the Bearer prefix (as seen before) .

We can use them in **OAuth** (for passwordless auth), or return an access token after the typical email-password login.

This access token lets access to the resources without the need to login repeatedly. Access token are short lived - typically *5-90* minutes.

It is validated by the server on **every request** and usually stored in localStorage (not recommended), cookies or in memory(volatile but safe). Local storage is vulnerable to **XSS** (Cross Side Scripting) attacks. Even session storage is exposed to JS.

**Why is it short-lived?** Because it is **stateless**. Once signed, it’s **independent of the DB**. They cannot be **revoked** (unless blacklists are used). If leaked, it's **usable immediately** until it expires.

### Refresh Tokens - What and Why ?

Access tokens are only valid for a **short time** period. Once expired, the client can use a *refresh* token to request for a new access token.

> Therefore, a refresh token is a **credential** (or key) that lets client get new access tokens without having to ask the user login again.

Key Points:

* **Longer-lived** (like 7–30 days)
    
* **Stored securely** (HttpOnly cookie or secure storage)
    
* Needs to be stored in the **DB**
    
* Must be **ROTATED** (replaced with a new one after each use)
    

If you used **just an access token**, you’d have to make the expiry super long so users don’t get logged out often.

But long-lived tokens can ultimately cause security risk.

So you split it :

| Token | Life Span | Use For | Stored In |
| --- | --- | --- | --- |
| Access Token | 15 mins | API requests | Memory / cookie |
| Refresh Token | 7+ days | Getting new token | HttpOnly cookie + DB |

![Access Token and Refresh Token](https://cdn.hashnode.com/res/hashnode/image/upload/v1747904922104/79503ba0-c163-472a-af5b-97a6077aa0ab.png)

In the diagram above, SPA = Single-Page Application; AS = Authorization Server; RS = Resource Server; AT = Access Token; RT = Refresh Token.

### Token Rotation

Refresh tokens are also **bearer tokens**, and hence there is a possibility that they get leaked. And if the attacker gets hold of any refresh token, they can generate infinite access tokens and abuse the resources.

To prevent this, we use the strategy of token rotation. Token rotation is **refresh token lifecycle management** with **built-in replay protection**.

Here is the flow for a minimal token rotation strategy (*AT* stands for **Access Token** and *RT* stands for **Refresh Token**)

* **Login:**
    
    * Issue \`AT1\` (short-lived)
        
    * Issue \`RT1\` (long-lived)
        
    * Store \`RT1\` in DB with status: \`active\`, \`used = false\`
        
* **Token refresh request:**
    
    * Client sends \`RT1\`
        
    * Server checks DB:
        
        * If \`used == false\` → valid
            
        * If \`used == true\` → replay attempt → invalidate all tokens for this user
            
    * Rotate:
        
        * Mark \`RT1\` as \`used = true\`
            
        * Issue new tokens \`AT2\`, \`RT2\`
            
* **Client replaces local token store with** \`AT2\` and \`RT2\`
    

This is secure :

* You **bind** the refresh token lifecycle to the DB
    
* Every token is **single-use only**
    
* If attacker tries to reuse \`RT1\`, server knows something’s wrong
    

### Some More Token Rotation Strategies

1. **Sliding Expiry**
    
    * Each time the refresh token is used to get a new access token, it **extends its own life**.
        
    * So, if you’re actively using the app, the token’s expiry keeps getting **pushed forward** - say, 30 days from *today*, not from *the original issue date*.
        
    * It mimics **real sessions** - active users stay logged in, idle ones get logged out *automatically*.
        
2. **Multiple Devices**
    

A user logs in:

* Phone → gets \`RT1\`, deviceID = \`iOS-1\`
    
* Browser → gets \`RT2\`, deviceID = \`Chrome-1\`
    

Each refresh token is associated with a **session ID** and **device**. You can:

* Revoke all tokens for a user
    
* Revoke only a specific session (say user logs out of iOS)
    

### Detecting Stolen Refresh Tokens

> “But what if attacker uses a refresh token before the user does?”

Here’s how:

* Server issues \`RT1\`
    
* Client hasn't used it yet
    
* Attacker uses \`RT1\`
    
* Server rotates and gives back \`RT2a\`
    
* Legit client tries using \`RT1\` — fails
    

**This is your “signal” that the refresh token was used by an attacker first.**

**Response?**

* Invalidate all user refresh tokens
    
* Log user out everywhere
    
* Alert user
    

You’ve just **detected a breach** proactively.

Access tokens are stateless. You don’t need to store them.

The DB only stores refresh tokens (and optionally, blacklisted access tokens if you want logout-before-expiry).

### Avoid these Mistakes

| Mistake | Fix |
| --- | --- |
| Keeping refresh token in localStorage | Use **HttpOnly secure cookies** |
| No rotation | **Always rotate refresh tokens** |
| Not expiring tokens | Use TTL + sliding expiry |
| Using same refresh token forever | Rotation. Rotation. Rotation. |
| Not binding refresh token to IP/device | Store \`User-Agent\`, \`deviceID\` optionally |

---

## Session Hijacking & Mitigation Tactics

Session hijacking is when the hacker *steals your session cookie or token* and gets full access as if they were you. No extra login needed. Hijacking is basically **identity theft at the protocol level**

### The Anatomy of Session Hijacking: How They Do It

1. **Session Sniffing**
    
    The attacker captures session tokens by sniffing network traffic - classic MITM (man-in-the-middle) attack. Happens mostly on unencrypted HTTP or insecure Wi-Fi.
    
2. **Cross-site Scripting (XSS)**
    
    Inject malicious scripts to steal tokens from cookies or localStorage in the victim’s browser.
    
3. **Session Fixation**
    
    Trick the victim into using a session ID chosen by the attacker, then hijack it once the victim logs in.
    
4. **Predictable Session IDs**
    
    Generate session tokens with weak randomness, letting attackers guess valid tokens.
    
5. **Malware & Keyloggers**
    
    Steal tokens from the victim’s device directly.
    

### The Migration Tactic

1. **Use HTTPS Everywhere**
    

If your app still serves login or session tokens over plain HTTP, you’re basically handing out your keys to every script-kiddie sniffing Wi-Fi packets.

* HTTPS encrypts data-in-transit, making MITM sniffing almost impossible.
    
* Set your cookie flag to \`Secure\` to only send cookies over HTTPS.
    

2. **Set HttpOnly Cookies**
    

Cookies with the \`HttpOnly\` flag cannot be accessed via JavaScript. That’s a direct shield against XSS attacks stealing cookies.

\`\`\`go
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict;

\`\`\`

3. **Implement SameSite Cookies**
    

\`SameSite\` attribute helps prevent CSRF (cross-site request forgery) by restricting when cookies get sent.

* \`Strict\` - only send cookies for same-site requests.
    
* \`Lax\` - send cookies for top-level navigation GET requests.
    
* \`None\` - send cookies everywhere (only with Secure).
    

For sessions, \`Strict\` or \`Lax\` is the way to go unless you need cross-origin requests.

4. **Regenerate Session IDs on Login**
    

Avoid session fixation by generating a brand-new session ID after successful authentication.

If you keep the same ID from before login, attackers who fixed that ID can instantly hijack.

5. **Use Strong, Unpredictable Session Tokens**
    

Randomness is king. Use cryptographically secure random generators for tokens.

Avoid any incremental or guessable IDs like \`session123\`, \`abc001\`, etc.

6. **Set Short Session Expiry and Idle Timeout**
    

Balance UX with security:

* Short-lived tokens reduce attack window.
    
* Idle timeouts log out inactive users automatically.
    
* Combine with refresh tokens if needed.
    

7. **Use Secure Authentication Tokens (JWT, PASETO or Opaque Tokens)**
    

JWTs/PASETO are popular but can backfire if you blindly trust them without verification.

Opaque tokens with server-side session store are simpler to revoke on logout or hijack detection.

8. **Monitor and Detect Anomalies**
    

Keep an eye on session behavior:

* Unusual IP switches
    
* Excessive requests from same token
    
* Multiple concurrent sessions from different geos
    

Set up alerting or automated session invalidation.

![Session Heist](https://cdn.hashnode.com/res/hashnode/image/upload/v1747905100343/dc2e973c-e7e2-4bbd-967d-6cc312635675.png)

If you don’t prioritize session security, you’re basically inviting hackers to take over your users’ accounts and burn your backend reputation to ashes. And trust me, no one wants to be that dev who ignored basic session hygiene.

---

## That was a long one. Let’s wrap up!

Alright, if you’re still here - damn. You just sat through a full-course meal of authentication: **stateful vs stateless**, **bearer tokens**, **JWT internals**, **PASETO**, **token rotation**, **session hijacking**, and even writing your own token system in Go. That’s not light reading. That’s *“backbone-of-your-entire-app”* reading.

If I sounded a little serious (or aggressive) in parts - yeah, my bad. It’s just that I’ve seen too many half-baked auth systems floating around in production like it’s no big deal. And someone had to say it.

But real talk: this stuff is hard. And it *should* be. Auth is one of those areas where being “close enough” usually means “completely broken.”

Hopefully this wasn’t just useful, but also kinda fun. Or at least bearable. If you’re walking away from this with a clearer mental model and some ideas you wanna implement or refactor- that’s a win.

Now go build auth like you actually care about your users.

Catch you in the next one.`
}