import { Button } from "./Button"
import { useLocalStorage } from "../hooks/useLocalStorage"


const Counter = () => {
    const [counter, setCounter] = useLocalStorage<number>("Counter", 0)
    return (
        <div className="space-y-2">
            <h2>Counter: {counter}</h2>
            <div className="space-x-2">
                <Button onClick={() => setCounter((prev) => prev + 1)}>Increase</Button>
                <Button onClick={() => setCounter(0)}>Reset</Button>
            </div>
        </div>
    )
}

export default Counter