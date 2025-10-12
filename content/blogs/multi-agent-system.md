
# Intelligent Multi-Agent System with Node.js: AI Orchestration

Architecting sophisticated AI systems where specialized agents collaborate to solve complex problems through intelligent orchestration

### Introduction

The artificial intelligence landscape is experiencing a paradigm shift. While monolithic AI models dominated the early adoption phase, the future belongs to collaborative multi-agent systems where specialized AI agents work in concert to tackle complex, multi-faceted problems. Today, I'll demonstrate how to architect and implement a production-ready multi-agent system using Node.js that showcases the power of intelligent AI orchestration.

## Understanding Multi-Agent Architecture

A multi-agent system represents a distributed AI architecture where autonomous agents collaborate to solve problems beyond individual agent capabilities. This approach mirrors human organizational structures - imagine a consulting firm where a project manager (orchestrator) coordinates specialists (agents) who use various tools to deliver comprehensive solutions.

## Core Architectural Principles

**Separation of Concerns**: Each agent specializes in specific domains, reducing complexity and improving maintainability.

**Intelligent Routing**: An orchestrator analyzes user intent and routes tasks to appropriate agents.

**Contextual Memory**: The system maintains conversation context for coherent multi-turn interactions.

**Tool Integration**: Agents leverage external APIs and services through a standardized tool interface.

### System Architecture

Our multi-agent system implements a hierarchical architecture with clear communication protocols and well-defined responsibilities.

![AI Agentic Workflow Architecture](https://cdn-images-1.medium.com/max/2000/1*ZoyiF-2VVPyKsMdQ6w66qQ.gif)*AI Agentic Workflow Architecture*

## Orchestrator: The Central Intelligence

The orchestrator serves as the system's brain, implementing sophisticated decision-making logic through multiple processing stages.

## Intent Classification Process

The orchestrator leverages large language models for intelligent intent analysis

## Memory Management Architecture

Context awareness enables natural conversation flow through sophisticated memory management

## The Agent Class

Here's a high-level breakdown of the Agent class:

* **Constructor**: Initializes the agent with a name, description, tools, and an LLM model.

* **Process Input**: Takes user input, decides on a tool, and executes the task.

* **Prompting**: Constructs a prompt for the LLM to guide decision-making.

Agents also handle parsing JSON responses from the LLM to ensure smooth execution.

    import { queryLLM } from '../llm/llmOps.js';
    
    export class Agent {
        constructor(name, description, tools, model) {
            this.memory = [];
            this.name = name;
            this.description = description;
            this.tools = tools;
            this.model = model;
            this.maxMemory = 10;
        }
    
        jsonParser(inputString) {
            console.log(typeof inputString);
            
            try {
                const jsonDict = JSON.parse(inputString);
                
                if (typeof jsonDict === 'object' && jsonDict !== null) {
                    return jsonDict;
                }
                
                throw new Error('Invalid JSON response');
            } catch (error) {
                throw new Error('Invalid JSON response');
            }
        }
    
        async processInput(userInput) {
            this.memory.push(`User: ${userInput}`);
            
            const context = this.memory.join('\n');
            const toolDescriptions = this.tools.map(tool => `- ${tool.name()}: ${tool.description()}`).join('\n');
            const responseFormat = { action: '', args: '' };
    
            const prompt = `Context:
            ${context}
    
            Available tools:
            ${toolDescriptions}
    
            Based on the user's input and context, decide if you should use a tool or respond directly.        
            If you identify a action, respond with the tool name and the arguments for the tool.        
            If you decide to respond directly to the user then make the action "respond_to_user" with args as your response in the following format.
    
            Response Format:
            ${JSON.stringify(responseFormat)}
    
            `;
    
            const response = await queryLLM(prompt);
            this.memory.push(`Agent: ${response}`);
    
            const responseDict = this.jsonParser(response);
    
            // Check if any tool can handle the input
            for (const tool of this.tools) {
                const currentResponse = Array.isArray(responseDict) ? responseDict[0] : responseDict;
                if (tool.name().toLowerCase() === currentResponse.action.toLowerCase()) {
                    return await tool.use(currentResponse.args);
                }
            }
    
            return responseDict;
        }
    }

## Agent Specialization Pattern

Each agent implements a standardized interface while maintaining domain expertise:

    const weatherAgent = new Agent(
        'Weather Agent',
        'Provides weather information for a given location',
        [new WeatherTool()],
        'gpt-4o-mini'
    );

    // Create Time Agent
    const timeAgent = new Agent(
        'Time Agent',
        'Provides the current time for a given city',
        [new TimeTool()],
        'gpt-4o-mini'
    );

## Tools in Action

Agents use tools to perform tasks. For example:

* **Weather Tool**: Fetches real-time weather data from OpenWeatherMap.

* **Time Tool**: Determines the local time for a given city, even without a timezone.

Each tool includes:

* A **name** and **description** to guide the LLM.

* A **use method** to perform the task.

## Weather Tool

    import axios from 'axios'
    import { BaseTool } from './BaseTool.js';
    
    export class WeatherTool extends BaseTool {
        name() {
            return 'Weather Tool';
        }
    
        description() {
            return 'Provides weather information for a given location. The payload is just the location. Example: New York';
        }
    
        async use(location) {
            const apiKey = process.env.OPENWEATHERMAP_API_KEY;
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
            
            try {
                const response = await axios.get(url);
                const data = response.data;
                
                if (data.cod === 200) {
                    const temp = data.main.temp;
                    const description = data.weather[0].description;
                    const result = `The weather in ${location} is currently ${description} with a temperature of ${temp}┬░C.`;
                    console.log(result);
                    return result;
                } else {
                    return `Sorry, I couldn't find weather information for ${location}.`;
                }
            } catch (error) {
                return `Sorry, I couldn't find weather information for ${location}.`;
            }
        }
    }

## Time Tool

    import { BaseTool } from './BaseTool.js';
    
    export class TimeTool extends BaseTool {
        name() {
            return 'Time Tool';
        }
    
        description() {
            return 'Provides the current time for a given city\'s timezone like Asia/Kolkata, America/New_York etc. If no timezone is provided, it returns the local time.';
        }
    
        use(timezone) {
            try {
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short'
                };
    
                let currentTime;
                if (timezone) {
                    console.log('TimeZone', timezone);
                    currentTime = new Date().toLocaleString('en-US', { ...options, timeZone: timezone });
                } else {
                    currentTime = new Date().toLocaleString('en-US', options);
                }
    
                return `The current time is ${currentTime}.`;
            } catch (error) {
                return `Invalid timezone: ${timezone}. Please provide a valid timezone like Asia/Kolkata or America/New_York.`;
            }
        }
    }

## The Orchestrator

The orchestrator coordinates multiple agents:

1. Accepts user input (intent classification using LLM)

1. Selects the right agent based on the intent (agent routing based on intent)

1. Manages task execution, including cases where multiple tasks are requested (coordinating tasks)

**Core Features of the Orchestrator**:

* Maintains context by storing user queries, agent responses, and intermediate results.

* Uses a reasoning loop to determine the next steps.

* Constructs prompts to guide the LLM in selecting the right agent and tools.

```
    import { queryLLM } from './llm/llmOps.js';
    import { logMessage } from './logger.js';
    import readline from 'readline';
    
    export class AgentOrchestrator {
        constructor(agents) {
            this.agents = agents;
            this.memory = [];
            this.maxMemory = 10;
        }
    
        jsonParser(inputString) {
            console.log(typeof inputString);
            
            try {
                const jsonDict = JSON.parse(inputString);
                
                if (typeof jsonDict === 'object' && jsonDict !== null) {
                    return jsonDict;
                }
                
                throw new Error('Invalid JSON response');
            } catch (error) {
                throw new Error('Invalid JSON response');
            }
        }
    
        async orchestrateTask(userInput) {
            this.memory = this.memory.slice(-this.maxMemory);
            
            const context = this.memory.join('\n');
            console.log(`Context: ${context}`);
    
            const responseFormat = { action: '', input: '', next_action: '' };
            
            const getPrompt = (userInput) => {
                return `
                    Use the context from memory to plan next steps.                
                    Context:
                    ${context}
    
                    You are an expert intent classifier.
                    You need will use the context provided and the user's input to classify the intent select the appropriate agent.                
                    You will rewrite the input for the agent so that the agent can efficiently execute the task.                                                
    
                    Here are the available agents and their descriptions:
                    ${this.agents.map(agent => `- ${agent.name}: ${agent.description}`).join(', ')}
    
                    User Input:
                    ${userInput}              
    
                    ###Guidelines###
                    - Sometimes you might have to use multiple agent's to solve user's input. You have to do that in a loop.
                    - The original userinput could have multiple tasks, you will use the context to understand the previous actions taken and the next steps you should take.
                    - Read the context, take your time to understand, see if there were many tasks and if you executed them all
                    - If there are no actions to be taken, then make the action "respond_to_user" with your final thoughts combining all previous responses as input.
                    - Respond with "respond_to_user" only when there are no agents to select from or there is no next_action
                    - You will return the agent name in the form of ${JSON.stringify(responseFormat)}
                    - Always return valid JSON like ${JSON.stringify(responseFormat)} and nothing else.                
    
                    `;
            };
    
            this.memory = this.memory.slice(-10);
            const prompt = getPrompt(userInput);
            const llmResponse = await queryLLM(prompt);
    
            const parsedResponse = this.jsonParser(llmResponse);
            console.log(`LLM Response: ${JSON.stringify(parsedResponse)}`);
    
            this.memory.push(`Orchestrator: ${JSON.stringify(parsedResponse)}`);
    
            let action, input;
            if (typeof parsedResponse === 'object' && parsedResponse !== null) {
                action = parsedResponse.action || '';
                input = parsedResponse.input || '';
            } else {
                throw new Error('LLM response is not a dictionary as expected.');
            }
    
            console.log(`Action identified by LLM: ${action}`);
    
            if (action === 'respond_to_user') {
                return parsedResponse;
            }
    
            for (const agent of this.agents) {
                if (agent.name === action) {
                    console.log('*******************Found Agent Name*******************************');
                    const agentResponse = await agent.processInput(input);
                    console.log(`${action} response: ${agentResponse}`);
                    this.memory.push(`Agent Response for Task: ${agentResponse}`);
                    console.log(this.memory);
                    return agentResponse;
                }
            }
        }
    
        async run() {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
    
            console.log('LLM Agent: Hello! How can I assist you today?');
            
            const askQuestion = () => {
                return new Promise((resolve) => {
                    rl.question('You: ', (answer) => {
                        resolve(answer);
                    });
                });
            };
    
            let userInput = await askQuestion();
            this.memory.push(`User: ${userInput}`);
    
            while (true) {
                if (typeof userInput === 'string' && ['exit', 'bye', 'close'].includes(userInput.toLowerCase())) {
                    console.log('See you later!');
                    break;
                }
    
                if (typeof userInput === 'string') {
                    const response = await this.orchestrateTask(userInput);
                    console.log(`Final response of orchestrator ${JSON.stringify(response)}`);
                    
                    if (typeof response === 'object' && response.action === 'respond_to_user') {
                        logMessage(`Response from Agent: ${response.input}`, 'RESPONSE');
                        userInput = await askQuestion();
                        this.memory.push(`User: ${userInput}`);
                    } else if (response === 'No action or agent needed') {
                        console.log('Response from Agent: ', response);
                        userInput = await askQuestion();
                    } else {
                        userInput = response;
                    }
                } else {
                    console.log('Invalid user_input type. Expected a string.');
                    break;
                }
            }
    
            rl.close();
        }
    }
```    

## Getting Started

To run this system locally:

    # Clone and setup
    git clone <repository-url>
    cd multi-agent-tool
    npm install
    
    # Configure environment
    echo "OPENAI_API_KEY=your_key" > .env
    echo "OPENWEATHERMAP_API_KEY=your_key" >> .env
    # Run the system
    npm start

## Real-World Applications

This architecture pattern is applicable to various domains:

1. **Customer Service Bots**: Route queries to specialized support agents

2. **Smart Home Systems**: Coordinate different IoT device controllers

3. **Business Process Automation**: Orchestrate different workflow steps

4. **Educational Platforms**: Route learning queries to subject experts

5. **E-commerce**: Handle product, inventory, and shipping queries

## Future Enhancements

Several exciting possibilities for extending this system:

1. Dynamic Agent Loading: Load agents at runtime based on requirements

2. Agent Learning: Implement feedback loops for continuous improvement

3. Multi-modal Support: Add support for image, audio, and video processing

4. Distributed Architecture: Scale across multiple servers

5. Advanced Memory: Implement long-term memory with vector databases

## Conclusion

Building a multi-agent system demonstrates the power of modular AI architecture. By breaking complex problems into specialized components, we create systems that are:

- **Maintainable**: Each component has a clear responsibility

- **Scalable**: New agents can be added without affecting existing ones

- **Robust**: Failures in one agent don't crash the entire system

- **Intelligent**: The orchestrator makes smart routing decisions

This project serves as a foundation for more sophisticated AI systems. The principles demonstrated here - intelligent orchestration, specialized agents, and contextual memory - are applicable to a wide range of AI applications.

The future of AI lies not in monolithic models but in collaborative systems where specialized agents work together to solve complex problems. This multi-agent approach represents a significant step toward more sophisticated, reliable, and maintainable AI systems.

- - -

**Ready to build your own multi-agent system? The complete source code and documentation are available on [GitHub](https://github.com/vishagar81/multi-agent-ai-tool). Start experimenting with different agents and see how far you can push the boundaries of AI orchestration!**

**This article demonstrates practical AI system architecture using modern JavaScript and Node.js. The complete implementation showcases real-world patterns for building scalable, maintainable AI applications.**

- - -

#AI #MultiAgent #NodeJS #OpenAI #SystemArchitecture #JavaScript #MachineLearning #Automation
