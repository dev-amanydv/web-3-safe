export const Container = ({children}: {children: React.ReactNode}) => {
    return <div className="py-14  h-screen justify-between flex flex-col items-center max-w-2xl w-full">
        {children}
    </div>
}