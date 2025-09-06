export const Container = ({children}: {children: React.ReactNode}) => {
    return <div className="min-h-screen pt-25 max-w-md w-full">
        {children}
    </div>
}