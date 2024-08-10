import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Connect({ className = '' }) {
    const { message, error } = usePage().props;

    const { data, setData, post, errors, processing, reset } = useForm({
        host: "",
        username: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('ssh.send'));
    };

    useEffect(() => {
        if (message) {
            reset();
        }
    }, [message, reset]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Connect SSH</h2>
            </header>

            {message && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                    {message}
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-12">
                <div>
                    <InputLabel htmlFor="host" value="Host" />

                    <TextInput
                        id="host"
                        className="mt-1 block w-full"
                        value={data.host}
                        onChange={(e) => setData('host', e.target.value)}
                        required
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.host} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.password} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
