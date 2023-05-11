import React from 'react';

type LoginFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function LoginForm({ handleSubmit }: LoginFormProps) {
    return (
        <div className="max-w-md mx-auto">
            <div>
                <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
            >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="username"
                            name="username"
                            type="text"
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Username"
                        />
                        <label
                            htmlFor="username"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            Username
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="password"
                            name="password"
                            type="password"
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Password"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            Password
                        </label>
                    </div>
                    <div className="flex w-full">
                        <button className="w-full relative overflow-hidden bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out group">
                            <span className="z-10 relative">Login</span>
                            <span className="absolute top-0 left-0 h-full w-full bg-blue-600 transform -translate-x-full transition duration-300 ease-in-out group-hover:translate-x-0"></span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
