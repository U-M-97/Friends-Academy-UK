//     const [num, setNum] = useState(0)
//     const numbers = [1000, 250, 500]
//     const initialNumber = useRef(0)
//     const speed = 200

// const updateNumber = () => {
//     const increment = Math.trunc(numbers[0] / speed)
//     if(initialNumber.current <= numbers[0]){
//         const result = initialNumber.current + increment
//         if(result > 1000) return setNum(numbers[0])
//         setNum(result)
//         initialNumber.current = result
//         setTimeout(updateNumber, 10)
//     }  
// }

// useEffect(() => {
//     let mounted = true
//     if(mounted){
//         updateNumber()
//     }

//     return () => {
//         mounted = false
//     }
// }, [isCountUp])