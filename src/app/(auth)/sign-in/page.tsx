export default function SignIn() {


    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                        <div className="grid p-0 md:grid-cols-2">
                            <form className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="felx flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Welcome Back</h1>
                                        <p className="text-balance text-muted-foreground">Login to your Rbb Market</p>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}