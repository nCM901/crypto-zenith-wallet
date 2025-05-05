
import { useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/Layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function DepositPage() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const { toast } = useToast();
  
  // Mock wallet addresses
  const walletAddresses = {
    bitcoin: "bc1q87x90rd79yze9rkj29m8g3r9udttgvw0dkpqe3",
    ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    usdc: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  };

  const cryptocurrencies = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      icon: "₿",
      color: "bg-crypto-orange",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      icon: "Ξ",
      color: "bg-crypto-blue",
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      icon: "$",
      color: "bg-crypto-green",
    },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddresses[selectedCrypto as keyof typeof walletAddresses]);
    toast({
      title: "Address copied!",
      description: "The wallet address has been copied to your clipboard.",
    });
  };

  return (
    <PageContainer
      title="Deposit"
      headerClassName="mb-4"
    >
      <div className="px-4 pb-6">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        
        <h2 className="text-2xl font-bold mb-2">Deposit Crypto</h2>
        <p className="text-muted-foreground mb-6">
          Send cryptocurrency from an external wallet to your Zenith Wallet
        </p>
        
        <Tabs
          defaultValue="bitcoin"
          onValueChange={(value) => setSelectedCrypto(value)}
          className="w-full"
        >
          <TabsList className="w-full mb-6">
            {cryptocurrencies.map((crypto) => (
              <TabsTrigger key={crypto.id} value={crypto.id} className="flex-1">
                {crypto.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {cryptocurrencies.map((crypto) => (
            <TabsContent key={crypto.id} value={crypto.id} className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className={`${crypto.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                      {crypto.icon}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-1">{crypto.name}</h3>
                    <p className="text-muted-foreground mb-4">Network: {crypto.name} Network</p>
                    
                    <div className="w-full p-4 bg-secondary rounded-lg mb-4 flex justify-center">
                      <QrCode size={180} />
                    </div>
                    
                    <div className="w-full mb-4">
                      <label className="text-sm font-medium block mb-2">
                        Your {crypto.name} Address:
                      </label>
                      <div className="flex">
                        <Input
                          value={walletAddresses[crypto.id as keyof typeof walletAddresses]}
                          readOnly
                          className="flex-1 pr-12 font-mono text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-[-40px]"
                          onClick={handleCopyAddress}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-sm text-yellow-800 dark:text-yellow-200 mb-4 w-full">
                      <p className="font-medium mb-1">Important:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Only send {crypto.symbol} to this address</li>
                        <li>Sending any other cryptocurrency may result in permanent loss</li>
                        <li>Minimum deposit: 0.001 {crypto.symbol}</li>
                      </ul>
                    </div>
                    
                    <Button
                      className="w-full"
                      onClick={handleCopyAddress}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageContainer>
  );
}
