
import { useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/Layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, KeyRound, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function WalletPage() {
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);
  const { toast } = useToast();
  
  // Mock wallet info data
  const walletInfo = {
    name: "Main Wallet",
    recoveryPhrase: "apple banana cherry dog elephant frog guitar hammer igloo jungle kite lion monkey",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  };

  const securityFeatures = [
    {
      id: "keygen",
      name: "Secure Key Generation",
      icon: KeyRound,
      description: "Private keys are generated and stored securely on your device",
    },
    {
      id: "encryption",
      name: "Advanced Encryption",
      icon: Lock,
      description: "All sensitive data is encrypted with state-of-the-art protocols",
    },
    {
      id: "protection",
      name: "Protection Measures",
      icon: Shield,
      description: "Multiple layers of security to keep your assets safe",
    },
  ];

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${item} copied!`,
      description: `The ${item.toLowerCase()} has been copied to your clipboard.`,
    });
  };

  return (
    <PageContainer title="Wallet">
      <div className="py-4 space-y-6">
        <div className="px-4">
          <h2 className="text-2xl font-bold mb-2">Wallet Details</h2>
          <p className="text-muted-foreground mb-6">
            Manage your wallet settings and security
          </p>
          
          <Card className="crypto-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{walletInfo.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Wallet Address
                  </label>
                  <div className="flex">
                    <Input
                      value={walletInfo.address}
                      readOnly
                      className="flex-1 pr-12 font-mono text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-[-40px]"
                      onClick={() => copyToClipboard(walletInfo.address, "Address")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">
                      Recovery Phrase
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs text-primary"
                      onClick={() => setShowRecoveryPhrase(!showRecoveryPhrase)}
                    >
                      {showRecoveryPhrase ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <div className="relative bg-secondary rounded-lg p-4">
                    {showRecoveryPhrase ? (
                      <div className="flex flex-wrap gap-1 font-mono">
                        {walletInfo.recoveryPhrase.split(" ").map((word, i) => (
                          <div key={i} className="bg-background px-2 py-1 rounded text-sm">
                            {i+1}. {word}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {Array(12).fill("").map((_, i) => (
                          <div key={i} className="bg-background px-2 py-1 rounded text-sm">
                            {i+1}. •••••
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {showRecoveryPhrase && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(walletInfo.recoveryPhrase, "Recovery phrase")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-red-500 mt-1">
                    Never share your recovery phrase with anyone!
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/backup">
                      Backup Wallet
                    </Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link to="/security">
                      Security Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Security features */}
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-4">Security Features</h3>
          
          <div className="space-y-4">
            {securityFeatures.map((feature) => (
              <Card key={feature.id} className={cn("overflow-hidden")}>
                <div className="flex p-4">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Additional wallet options */}
        <div className="px-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/connect-hardware">
                    Connect Hardware Wallet
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/export-keys">
                    Export Private Keys
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  Delete Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
