export const Container = ({children}: {children: React.ReactNode}) => {
    return <div className="h-screen max-w-md w-full">
        {children}
    </div>
}