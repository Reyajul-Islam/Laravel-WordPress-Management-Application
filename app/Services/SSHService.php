<?php

namespace App\Services;

use phpseclib3\Net\SSH2;

class SSHService
{
    protected $ssh;

    public function __construct($host, $username, $password)
    {
        $this->ssh = new SSH2($host);
        if (!$this->ssh->login($username, $password)) {
            throw new \Exception('Login failed');
        }
    }

    public function exec($command)
    {
        return $this->ssh->exec($command);
    }
}
